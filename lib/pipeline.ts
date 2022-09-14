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
                commands: ['npm ci', 'npm run build', 'npx cdk synth'],
            }),
        });

        pipeline.addStage(new PipelineStage(this, 'beta', {}));
    }
}
