import { InfrastructureStack } from './infrastructure-stack';
import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AuthStack } from './authStack';

export class PipelineStage extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        new InfrastructureStack(this, 'DevOpsInfraStack');
        new AuthStack(this, 'DevOpsAuthStack');
    }
}
