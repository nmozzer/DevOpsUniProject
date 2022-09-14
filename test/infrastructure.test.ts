import { InfrastructureStack } from './../lib/infrastructure-stack';
import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

describe('InfrastructureStack', () => {
    const app = new App();
    const stack = new InfrastructureStack(app, 'Test');

    // Template.fromStack(stack).hasResource('AWS::CLoudFormation::CfnOutput', {});
});
