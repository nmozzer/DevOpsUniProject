import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

interface UIStackProps extends cdk.StackProps {
    domainName: string;
    hostedZoneName: string;
}

export class UIStack extends cdk.Stack {
    private domainName: string;
    private hostedZoneName: string;

    constructor(scope: Construct, id: string, props: UIStackProps) {
        super(scope, id, props);

        this.domainName = props.domainName;
        this.hostedZoneName = props.hostedZoneName;

        const assetsBucket = new s3.Bucket(this, 'AssetBucket', {
            bucketName: this.domainName,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });

        const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
            domainName: this.hostedZoneName,
        });

        const domainCertificate = new acm.DnsValidatedCertificate(this, 'Certificate', {
            domainName: this.domainName,
            hostedZone,
        });

        const cloudFrontIdentity = new cloudfront.OriginAccessIdentity(this, 'Identity');
        assetsBucket.grantRead(cloudFrontIdentity);

        const s3OriginConfig: cloudfront.SourceConfiguration = {
            behaviors: [{ isDefaultBehavior: true }],
            s3OriginSource: {
                s3BucketSource: assetsBucket,
                originAccessIdentity: cloudFrontIdentity,
            },
        };

        const apiOriginConfig: cloudfront.SourceConfiguration = {
            customOriginSource: { domainName: this.domainName },
            behaviors: [
                {
                    pathPattern: '/api/*',
                    allowedMethods: cloudfront.CloudFrontAllowedMethods.ALL,
                    defaultTtl: cdk.Duration.seconds(0),
                    minTtl: cdk.Duration.seconds(0),
                    maxTtl: cdk.Duration.seconds(0),
                    forwardedValues: {
                        queryString: true,
                        headers: ['Authorization'],
                    },
                },
            ],
        };

        const cloudFrontDistribution = new cloudfront.CloudFrontWebDistribution(this, 'Distribution', {
            viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(domainCertificate, {
                aliases: [hostedZone.zoneName],
                securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
            }),
            originConfigs: [s3OriginConfig, apiOriginConfig],
        });

        new route53.ARecord(this, 'DomainToDistributionRecord', {
            recordName: this.domainName,
            target: route53.RecordTarget.fromAlias(new route53Targets.CloudFrontTarget(cloudFrontDistribution)),
            zone: hostedZone,
        });

        new s3Deployment.BucketDeployment(this, 'DeployAssetBucket', {
            destinationBucket: assetsBucket,
            sources: [s3Deployment.Source.asset('../frontend/public')],
            distribution: cloudFrontDistribution,
            expires: cdk.Expiration.after(cdk.Duration.seconds(1)),
        });
    }
}
