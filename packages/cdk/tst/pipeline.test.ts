import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as path from 'path';
import { PipelineStack } from '../lib/pipeline';

describe('Pipeline', () => {
    it('Has expected stack resources', () => {
        const app = new App();

        const stack = new PipelineStack(app, 'TestPipeline');

        Template.fromStack(stack).hasResource('AWS::CodePipeline::Pipeline', {
            Properties: {
                Name: 'DevOpsAssignmentPipeline',
            },
        });
    });
});
