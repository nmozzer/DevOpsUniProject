import { PipelineStage } from './stage';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Stage, STAGES } from './types';

const GITHUB_SOURCE_REPO = 'nmozzer/DevOpsUniProject';

const ENV: Record<string, string> = {
    AWS_ACCOUNT_ID: '431367909633',
    AWS_DEFAULT_REGION: 'eu-west-1',
    AWS_HOSTED_ZONE_NAME: 'nicksjm.people.amazon.dev',
};

export class PipelineStack extends cdk.Stack {
    private pipeline: CodePipeline;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'DevOpsAssignmentPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub(GITHUB_SOURCE_REPO, 'main'),
                commands: [
                    'npm ci',
                    'npm run bootstrap',
                    'npm run install-all',
                    'npm run build',
                    'npm run test',
                    'npm run cdk-synth',
                ],
                primaryOutputDirectory: 'packages/cdk/cdk.out',
                env: ENV,
            }),
        });

        STAGES.forEach((stage) => this.setupStage(stage));
    }

    setupStage(stage: Stage): void {
        const pipelineStage = this.pipeline.addStage(new PipelineStage(this, stage, {}));
        pipelineStage.addPre(
            new ShellStep(`Test${stage}`, {
                commands: ['npm ci', stage === 'Test' ? 'npm run test-integration' : 'npm run test'],
                env: ENV,
            }),
        );

        if (stage !== 'Test') {
            pipelineStage.addPost(
                new ShellStep('HealthCheck', {
                    commands: ['node bin/checks.ts'],
                    env: ENV,
                }),
            );
        }
    }
}
