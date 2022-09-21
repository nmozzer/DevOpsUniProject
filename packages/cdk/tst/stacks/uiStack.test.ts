import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as path from 'path';
import { UIStack } from '../../lib/stacks/uiStack';

const STAGE = 'Beta';
const DOMAIN_NAME = 'test.dev-ops-assignment.nicksjm.people.amazon.dev';
const HOSTED_ZONE_NAME = 'nicksjm.people.amazon.dev';
const HOSTED_ZONE_ID = 'TestHostedZoneId';

describe('UIStack', () => {
    it('Has expected stack resources', () => {
        const app = new App();
        const appRoot = path.resolve(__dirname);

        const stack = new UIStack(app, 'TestUI', {
            domainName: DOMAIN_NAME,
            hostedZoneName: HOSTED_ZONE_NAME,
            stage: STAGE,
            hostedZoneId: HOSTED_ZONE_ID,
            frontEndAssetRoute: appRoot,
        });

        Template.fromStack(stack).hasResource('AWS::S3::Bucket', {});
        Template.fromStack(stack).hasResource('Custom::CDKBucketDeployment', {});
        Template.fromStack(stack).hasResource('AWS::CloudFront::Distribution', {});
    });
});
