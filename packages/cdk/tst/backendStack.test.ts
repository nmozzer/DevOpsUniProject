import { BackendStack } from '../lib/stacks/backendStack';
import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AuthStack } from '../lib/stacks/authStack';

describe('BackendStack', () => {
    it('Has expected stack resources', () => {
        const app = new App();
        const { userPool } = new AuthStack(app, 'AuthTest');
        // const stack = new BackendStack(app, 'Test', { userPool, assetRoute: '../backend' });

        // Template.fromStack(stack).hasResource('AWS::DynamoDB::Table', {});
        // Template.fromStack(stack).hasResource('AWS::Lambda::Function', {});
        // Template.fromStack(stack).hasResource('AWS::ApiGatewayV2::Api', {});
    });
});
