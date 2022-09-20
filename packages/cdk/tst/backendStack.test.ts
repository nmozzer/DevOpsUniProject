import { BackendStack } from '../lib/stacks/backendStack';
import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AuthStack } from '../lib/stacks/authStack';
import * as path from 'path';

describe('BackendStack', () => {
    it('Has expected stack resources', () => {
        const app = new App();
        const appRoot = path.resolve(__dirname);

        const stage = 'Test';
        const { userPool, userPoolClient } = new AuthStack(app, 'AuthTest', { stage });
        const stack = new BackendStack(app, 'Test', { userPool, assetRoute: appRoot, userPoolClient, stage });

        Template.fromStack(stack).hasResource('AWS::DynamoDB::Table', {});
        Template.fromStack(stack).hasResource('AWS::Lambda::Function', {});
        Template.fromStack(stack).hasResource('AWS::ApiGatewayV2::Api', {});
    });
});
