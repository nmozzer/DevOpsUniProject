interface Config {
    account: string;
    region: string;
    hostedZoneName: string;
    hostedZoneId: string;
}

export const CONFIG: Config = {
    account: process.env.AWS_ACCOUNT_ID || '431367909633',
    region: process.env.AWS_DEFAULT_REGION || 'us-east-1',
    hostedZoneName: process.env.AWS_HOSTED_ZONE_NAME || 'nicksjm.people.amazon.dev',
    hostedZoneId: process.env.AWS_HOSTED_ZONE_ID || 'Z0777786FN0GYVAPU5DD',
};
