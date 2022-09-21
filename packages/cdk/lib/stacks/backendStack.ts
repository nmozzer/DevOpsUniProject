import { CustomStage } from './../types';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGatewayAuthorizers from '@aws-cdk/aws-apigatewayv2-authorizers-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { IUserPool, IUserPoolClient } from 'aws-cdk-lib/aws-cognito';
import {
    CorsHttpMethod,
    CorsPreflightOptions,
    HttpApi,
    HttpMethod,
    HttpNoneAuthorizer,
    HttpRoute,
    HttpRouteKey,
} from '@aws-cdk/aws-apigatewayv2-alpha';

interface Props extends StackProps {
    userPool: IUserPool;
    userPoolClient: IUserPoolClient;
    assetRoute: string;
    stage: CustomStage;
}

const PRIMARY_KEY = 'PK';
const HANDLER_ROUTE = 'dist/index.handler';
const ALLOW_ORIGINS = ['http://*', 'https://*'];
const ALLOW_HEADERS = ['*'];
const ALLOW_METHODS = [CorsHttpMethod.ANY];

export class BackendStack extends Stack {
    readonly domainName: string;

    constructor(scope: Construct, id: string, props: Props) {
        super(scope, id, props);

        const { userPool, assetRoute, userPoolClient, stage } = props;

        const ffTable = new dynamodb.Table(this, `${stage}DevOpsAssignmentTable`, {
            partitionKey: { name: PRIMARY_KEY, type: dynamodb.AttributeType.STRING },
        });

        const routingLambda = new lambda.Function(this, `${stage}DevOpsAssignmentRoutingLambda`, {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: new lambda.AssetCode(assetRoute),
            handler: HANDLER_ROUTE,
            environment: {
                FF_TABLE: ffTable.tableName,
                USER_POOL: userPool.userPoolId,
            },
        });

        ffTable.grantFullAccess(routingLambda);

        const corsPreflight: CorsPreflightOptions = {
            allowHeaders: ALLOW_HEADERS,
            allowMethods: ALLOW_METHODS,
            allowOrigins: ALLOW_ORIGINS,
            allowCredentials: true,
        };

        const authorizer = new apiGatewayAuthorizers.HttpUserPoolAuthorizer(`${stage}user-pool-authorizer`, userPool, {
            userPoolClients: [userPoolClient],
        });
        const integration = new HttpLambdaIntegration(`${stage}DevOpsAssignmentAPIIntegration`, routingLambda, {});

        const api = new HttpApi(this, `${stage}DevOpsAssignmentAPI`, {
            corsPreflight,
            defaultAuthorizer: authorizer,
            defaultIntegration: integration,
        });

        new HttpRoute(this, `${stage}DevOpsAssignmentOptionsRoute`, {
            integration,
            httpApi: api,
            routeKey: HttpRouteKey.with('/{proxy+}', HttpMethod.OPTIONS),
            authorizer: new HttpNoneAuthorizer(),
        });

        this.domainName = `${api.httpApiId}.execute-api.${this.region}.amazonaws.com`;
    }
}
