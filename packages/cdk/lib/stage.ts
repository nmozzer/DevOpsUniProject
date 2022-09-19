import { BackendStack } from './stacks/backendStack';
import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AuthStack } from './stacks/authStack';

export class PipelineStage extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const { userPool } = new AuthStack(this, 'DevOpsAuthStack');
        // const backend = new BackendStack(this, 'DevOpsBackend', { userPool, assetRoute: '../backend' });
    }
}
