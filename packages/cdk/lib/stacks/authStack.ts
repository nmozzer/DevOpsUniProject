import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';

export class AuthStack extends cdk.Stack {
    readonly userPool: cognito.IUserPool;
    readonly userPoolWebClient: cognito.IUserPoolClient;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.userPool = new cognito.UserPool(this, 'FFUserPool', {
            userPoolName: 'FFUserPool',
            selfSignUpEnabled: false,
        });

        this.userPoolWebClient = this.userPool.addClient('UserPoolWebClient', {
            authFlows: {
                userPassword: true,
                userSrp: true,
            },
            generateSecret: false,
        });

        this.createUserPoolGroup('Admin');
        this.createUserPoolGroup('User');
    }

    private createUserPoolGroup(groupName: string) {
        new cognito.CfnUserPoolGroup(this, groupName, {
            userPoolId: this.userPool.userPoolId,
            groupName,
        });
    }
}
