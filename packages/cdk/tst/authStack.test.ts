import { AuthStack } from '../lib/stacks/authStack';
import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

describe('AuthStack', () => {
    it('Has expected stack resources', () => {
        const app = new App();
        const stack = new AuthStack(app, 'Test', { stage: 'Test' });

        Template.fromStack(stack).hasResourceProperties('AWS::Cognito::UserPool', {
            UserPoolName: 'TestFFUserPool',
        });
    });
});
