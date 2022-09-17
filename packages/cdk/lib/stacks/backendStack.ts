import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apig from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { IUserPool } from 'aws-cdk-lib/aws-cognito';

interface Props extends StackProps {
    userPool: IUserPool;
}

export class BackendStack extends Stack {
    readonly domainName: string;

    constructor(scope: Construct, id: string, props: Props) {
        super(scope, id, props);

        const { userPool } = props;

        const ffTable = new dynamodb.Table(this, 'FFTable', {
            partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
        });

        const routingLambda = new lambda.Function(this, 'RoutingLambda', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: new lambda.AssetCode('backend'),
            handler: 'dist/index.handler',
            environment: {
                FF_TABLE: ffTable.tableName,
                USER_POOL: userPool.userPoolId,
            },
        });

        ffTable.grantFullAccess(routingLambda);

        const corsPreflight: apig.CorsPreflightOptions = {
            allowHeaders: ['*'],
            allowMethods: [apig.CorsHttpMethod.POST, apig.CorsHttpMethod.GET],
            allowOrigins: ['http://localhost:8080'],
        };

        const apiRoutes: apig.AddRoutesOptions = {
            path: '/api/{proxy+}',
            integration: new HttpLambdaIntegration('APIIntegration', routingLambda, {}),
        };

        const api = new apig.HttpApi(this, 'API', { corsPreflight });
        api.addRoutes(apiRoutes);

        this.domainName = `${api.httpApiId}.execute-api.${this.region}.amazonaws.com`;
    }
}
