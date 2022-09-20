import { PipelineStage } from './stage';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Stage, STAGES } from './types';
import { CONFIG } from './config';

const GITHUB_SOURCE_REPO = 'nmozzer/DevOpsUniProject';

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
                primaryOutputDirectory: './packages/cdk/cdk.out',
            }),
        });

        STAGES.forEach((stage) => this.setupStage(stage));
    }

    setupStage(stage: Stage): void {
        const { hostedZoneName, hostedZoneId } = CONFIG;
        const pipelineStage = this.pipeline.addStage(
            new PipelineStage(this, stage, {
                stage: stage,
                hostedZoneId: hostedZoneId,
                hostedZoneName: hostedZoneName,
                domainName: `${stage.toLocaleLowerCase()}.dev-ops-assignment.${hostedZoneName}`,
            }),
        );
        pipelineStage.addPre(
            new ShellStep(`Test${stage}`, {
                commands: [
                    'npm ci',
                    'npm run bootstrap',
                    'npm run install-all',
                    'npm run build',
                    stage === 'Test' ? 'npm run test' : 'npm run test',
                ],
            }),
        );

        if (stage !== 'Test') {
            pipelineStage.addPost(
                new ShellStep('HealthCheck', {
                    commands: [`curl -Ssf ${stage.toLocaleLowerCase()}.dev-ops-assignment.${hostedZoneName}`],
                }),
            );
        }
    }
}
