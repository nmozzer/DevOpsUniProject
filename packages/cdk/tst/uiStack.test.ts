import { UIStack } from './../lib/stacks/uiStack';
import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as path from 'path';

describe('UIStack', () => {
    it('Has expected stack resources', () => {
        const app = new App();
        const appRoot = path.resolve(__dirname);

        const stage = 'Test';
        const domainName = 'test.dev-ops-assignment.nicksjm.people.amazon.dev';
        const hostedZoneName = 'nicksjm.people.amazon.dev';
        const hostedZoneId = 'TestHostedZoneId';

        const stack = new UIStack(app, 'TestUI', {
            domainName,
            hostedZoneName,
            stage,
            hostedZoneId,
            frontEndAssetRoute: appRoot,
        });

        Template.fromStack(stack).hasResource('AWS::S3::Bucket', {});
        Template.fromStack(stack).hasResource('Custom::CDKBucketDeployment', {});
        Template.fromStack(stack).hasResource('AWS::CloudFront::Distribution', {});
    });
});
