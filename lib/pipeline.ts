import { PipelineStage } from './stage';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

const GITHUB_SOURCE_REPO = 'nmozzer/DevOpsUniProject';

export class PipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'DevOpsAssignmentPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub(GITHUB_SOURCE_REPO, 'main'),
                commands: ['npm ci', 'npm run test', 'npm run build', 'npx cdk synth'],
            }),
        });

        const test = pipeline.addStage(new PipelineStage(this, 'Test', {}));
        test.addPre(
            new ShellStep('Test', {
                commands: ['npm ci', 'npm run integ-test'],
            }),
        );

        const beta = pipeline.addStage(new PipelineStage(this, 'Beta', {}));
        beta.addPre(
            new ShellStep('Beta', {
                commands: ['npm ci', 'npm run test'],
            }),
        );

        const prod = pipeline.addStage(new PipelineStage(this, 'Prod', {}));
        prod.addPre(
            new ShellStep('Prod', {
                commands: ['npm ci', 'npm run test'],
            }),
        );
    }
}
