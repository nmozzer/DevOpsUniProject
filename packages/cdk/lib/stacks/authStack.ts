import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { StackProps } from 'aws-cdk-lib';
import { CustomStage } from '../types';

interface AuthStackProps extends StackProps {
    stage: CustomStage;
}

const EMAIL_SUBJECT = 'DevOpsAssignment: Your verification code is {####}';
const EMAIL_BODY = 'Your verification code is {####}';
const SMS_MESSAGE = 'DevOpsAssignment: Your verification code is {####}';

export class AuthStack extends cdk.Stack {
    readonly userPool: cognito.IUserPool;
    readonly userPoolClient: cognito.IUserPoolClient;

    constructor(scope: Construct, id: string, props: AuthStackProps) {
        super(scope, id, props);

        const { stage } = props;

        this.userPool = new cognito.UserPool(this, `${stage}DevOpsUserPool`, {
            userPoolName: `${stage}DevOpsUserPool`,
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
                emailSubject: EMAIL_SUBJECT,
                emailBody: EMAIL_BODY,
                emailStyle: cognito.VerificationEmailStyle.CODE,
                smsMessage: SMS_MESSAGE,
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
