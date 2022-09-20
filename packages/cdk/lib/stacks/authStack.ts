import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { StackProps } from 'aws-cdk-lib';

interface AuthStackProps extends StackProps {
    stage: string;
}

export class AuthStack extends cdk.Stack {
    readonly userPool: cognito.IUserPool;
    readonly userPoolClient: cognito.IUserPoolClient;

    constructor(scope: Construct, id: string, props: AuthStackProps) {
        super(scope, id, props);

        const { stage } = props;

        this.userPool = new cognito.UserPool(this, `${stage}FFUserPool`, {
            userPoolName: `${stage}FFUserPool`,
            selfSignUpEnabled: true,
            signInAliases: {
                email: true,
                username: true,
            },
            passwordPolicy: {
                minLength: 8,
                requireDigits: false,
                requireLowercase: false,
                requireSymbols: false,
                requireUppercase: false,
            },
            userVerification: {
                emailSubject: 'DevOpsAssignment: Your verification code is {####}',
                emailBody: `Your verification code is {####}`,
                emailStyle: cognito.VerificationEmailStyle.CODE,
                smsMessage: 'DevOpsAssignment: Your verification code is {####}',
            },
        });

        this.userPoolClient = this.userPool.addClient(`${stage}UserPoolWebClient`, {
            authFlows: {
                userSrp: true,
                userPassword: true,
            },
        });

        this.createUserPoolGroup('Admin', stage);
        this.createUserPoolGroup('User', stage);
    }

    private createUserPoolGroup(groupName: string, stage: string) {
        new cognito.CfnUserPoolGroup(this, `${stage}${groupName}`, {
            userPoolId: this.userPool.userPoolId,
            groupName,
        });
    }
}
 