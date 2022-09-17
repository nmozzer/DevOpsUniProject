import { BackendStack } from '../lib/stacks/backendStack';
import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

describe('BackendStack', () => {
    it('Has expected stack resources', () => {
        const app = new App();
        const stack = new BackendStack(app, 'Test');

        Template.fromStack(stack).hasOutput('DummyOutput', {
            Value: 'Dummy',
        });
    });
});
