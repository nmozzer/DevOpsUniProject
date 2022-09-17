interface Config {
    account: string;
    region: string;
    hostedZoneName: string;
}

if (!process.env.AWS_HOSTED_ZONE_NAME) {
    throw new Error('Could not find $AWS_HOSTED_ZONE_NAME');
}

if (!process.env.AWS_DEFAULT_REGION) {
    throw new Error('Could not find $AWS_DEFAULT_REGION');
}

if (!process.env.AWS_ACCOUNT_ID) {
    throw new Error('Could not find $AWS_ACCOUNT_ID');
}

export const CONFIG: Config = {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_DEFAULT_REGION,
    hostedZoneName: process.env.AWS_HOSTED_ZONE_NAME,
};
