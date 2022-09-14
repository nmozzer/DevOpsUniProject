import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class InfrastructureStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new CfnOutput(this, 'DummyOutput', {
            value: 'Dummy',
        });
    }
}
