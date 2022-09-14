#!/usr/bin/env node
import { PipelineStack } from './../lib/pipeline';
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

const app = new cdk.App();
new PipelineStack(app, 'MyPipelineStack', {
    env: {
        account: '431367909633',
        region: 'eu-west-1',
    },
});

app.synth();