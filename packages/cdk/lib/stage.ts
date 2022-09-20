import { UIStack } from './stacks/uiStack';
import { BackendStack } from './stacks/backendStack';
import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AuthStack } from './stacks/authStack';

interface CustomStageProps extends StageProps {
    stage: string;
    hostedZoneId: string;
    hostedZoneName: string;
    domainName: string;
}
export class PipelineStage extends Stage {
    constructor(scope: Construct, id: string, props: CustomStageProps) {
        super(scope, id, props);

        const { stage, hostedZoneName, domainName, hostedZoneId } = props;

        const { userPool, userPoolClient } = new AuthStack(this, `${stage}DevOpsAuthStack`, { stage });
        // const backend = new BackendStack(this, `${stage}DevOpsBackend`, {
        //     userPool,
        //     assetRoute: '../backend',
        //     userPoolClient,
        //     stage,
        // });

        // const uiStack = new UIStack(this, `${stage}DevOpsUIStack`, {
        //     domainName,
        //     hostedZoneName,
        //     stage,
        //     hostedZoneId,
        // });
    }
}
