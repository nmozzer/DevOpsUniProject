import { UIStack } from './../lib/stacks/uiStack';
import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

describe('UIStack', () => {
    it('Has expected stack resources', () => {
        const app = new App();

        const stage = 'Test';
        const domainName = 'test-domain';
        const hostedZoneName = 'TestHostedZone';
        const hostedZoneId = 'TestHostedZoneId';

        const stack = new UIStack(app, 'TestUI', {
            domainName,
            hostedZoneName,
            stage,
            hostedZoneId,
        });

        Template.fromStack(stack).hasResource('AWS::S3::Bucket', {});
        Template.fromStack(stack).hasResource('Custom::CDKBucketDeployment', {});
        Template.fromStack(stack).hasResource('AWS::CloudFront::Distribution', {});
    });
});
