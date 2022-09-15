#!/usr/bin/env node
import { PipelineStack } from './../lib/pipeline';
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CONFIG } from '../lib/config';

const { account, region } = CONFIG;

const app = new cdk.App();
new PipelineStack(app, 'DevOpsPipelineStack', {
    env: {
        account,
        region,
    },
});

app.synth();