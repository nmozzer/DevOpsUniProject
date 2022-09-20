import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

interface UIStackProps extends cdk.StackProps {
    domainName: string;
    hostedZoneName: string;
    hostedZoneId: string;
    stage: string;
    frontEndAssetRoute: string;
}

export class UIStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: UIStackProps) {
        super(scope, id, props);
        const { domainName, hostedZoneName, hostedZoneId, stage, frontEndAssetRoute } = props;

        const cloudFrontIdentity = new cloudfront.OriginAccessIdentity(this, `${stage}Identity`);

        const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, `${stage}HostedZone`, {
            hostedZoneId,
            zoneName: hostedZoneName,
        });

        const domainCertificate = new acm.DnsValidatedCertificate(this, `${stage}Certificate`, {
            domainName,
            hostedZone,
        });

        const assetsBucket = new s3.Bucket(this, `${stage}AssetBucket`, {
            bucketName: domainName,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });

        assetsBucket.grantRead(cloudFrontIdentity);

        const cloudFrontDistribution = new cloudfront.Distribution(this, `${stage}Distribution`, {
            certificate: domainCertificate,
            domainNames: [domainName],
            enableLogging: true,
            defaultRootObject: 'index.html',
            defaultBehavior: {
                origin: new S3Origin(assetsBucket, {
                    originAccessIdentity: cloudFrontIdentity,
                }),
            },
        });

        new route53.ARecord(this, `${stage}DomainToDistributionRecord`, {
            recordName: domainName,
            target: route53.RecordTarget.fromAlias(new route53Targets.CloudFrontTarget(cloudFrontDistribution)),
            zone: hostedZone,
        });

        new s3Deployment.BucketDeployment(this, `${stage}DeployAssetBucket`, {
            destinationBucket: assetsBucket,
            sources: [s3Deployment.Source.asset(frontEndAssetRoute)],
            distribution: cloudFrontDistribution,
            distributionPaths: ['/*'],
            memoryLimit: 512,
        });
    }
}
