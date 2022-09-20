import { DDB_CLIENT } from './ddbClient';
import { APIGatewayProxyResultV2 } from 'aws-lambda';
import { RawRequest } from './types';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const unWrappedHandler = async (client: DynamoDBClient) => {
    return {
        statusCode: 200,
        body: 'Hello World',
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

export const handler = async (rawRequest: RawRequest): Promise<APIGatewayProxyResultV2> => {
    console.log(rawRequest);
    return await unWrappedHandler(DDB_CLIENT);
};

export default handler;
