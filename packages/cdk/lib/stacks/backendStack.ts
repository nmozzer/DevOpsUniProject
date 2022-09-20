import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apig from '@aws-cdk/aws-apigatewayv2-alpha';
import * as apiGatewayAuthorizers from '@aws-cdk/aws-apigatewayv2-authorizers-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { IUserPool, IUserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { CfnRoute } from 'aws-cdk-lib/aws-apigatewayv2';
import { AuthorizationType } from 'aws-cdk-lib/aws-apigateway';

interface Props extends StackProps {
    userPool: IUserPool;
    userPoolClient: IUserPoolClient;
    assetRoute: string;
    stage: string;
}

export class BackendStack extends Stack {
    readonly domainName: string;

    constructor(scope: Construct, id: string, props: Props) {
        super(scope, id, props);

        const { userPool, assetRoute, userPoolClient, stage } = props;

        const ffTable = new dynamodb.Table(this, `${stage}FFTable`, {
            partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
        });

        const routingLambda = new lambda.Function(this, `${stage}RoutingLambda`, {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: new lambda.AssetCode(assetRoute),
            handler: 'dist/index.handler',
            environment: {
                FF_TABLE: ffTable.tableName,
                USER_POOL: userPool.userPoolId,
            },
        });

        ffTable.grantFullAccess(routingLambda);

        const corsPreflight: apig.CorsPreflightOptions = {
            allowHeaders: ['*'],
            allowMethods: [apig.CorsHttpMethod.POST, apig.CorsHttpMethod.GET, apig.CorsHttpMethod.OPTIONS],
            allowOrigins: ['*'],
        };

        const authorizer = new apiGatewayAuthorizers.HttpUserPoolAuthorizer(`${stage}user-pool-authorizer`, userPool, {
            userPoolClients: [userPoolClient],
        });

        const apiRoutes: apig.AddRoutesOptions = {
            path: '/api/{proxy+}',
            integration: new HttpLambdaIntegration(`${stage}APIIntegration`, routingLambda, {}),
            authorizer,
        };

        const api = new apig.HttpApi(this, `${stage}API`, { corsPreflight });
        api.addRoutes(apiRoutes);

        new CfnRoute(this, `${stage}OptionsRoute`, {
            apiId: api.httpApiId,
            routeKey: 'OPTIONS /api/{proxy+}',
            authorizationType: AuthorizationType.NONE,
        });

        this.domainName = `${api.httpApiId}.execute-api.${this.region}.amazonaws.com`;
    }
}
