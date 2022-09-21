import { UIStack } from './stacks/uiStack';
import { BackendStack } from './stacks/backendStack';
import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AuthStack } from './stacks/authStack';
import { CustomStage } from './types';

interface CustomStageProps extends StageProps {
    stage: CustomStage;
    hostedZoneId: string;
    hostedZoneName: string;
    domainName: string;
}

const BACKEND_ASSET_ROUTE = '../backend';
const FRONTEND_ASSET_ROUTE = '../frontend/build';

export class PipelineStage extends Stage {
    constructor(scope: Construct, id: string, props: CustomStageProps) {
        super(scope, id, props);

        const { stage, hostedZoneName, domainName, hostedZoneId } = props;

        const { userPool, userPoolClient } = new AuthStack(this, `${stage}DevOpsAuthStack`, { stage: stage });

        new BackendStack(this, `${stage}DevOpsBackend`, {
            userPool,
            assetRoute: BACKEND_ASSET_ROUTE,
            userPoolClient,
            stage,
        });

        new UIStack(this, `${stage}DevOpsUIStack`, {
            domainName,
            hostedZoneName,
            stage,
            hostedZoneId,
            frontEndAssetRoute: FRONTEND_ASSET_ROUTE,
        });
    }
}
