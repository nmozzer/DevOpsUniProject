import { APIGatewayProxyResultV2 } from 'aws-lambda';
import { RawRequest } from './types';

const unWrappedHandler = async () => {
    return {
        statusCode: 200,
        body: 'Hello World',
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

export const handler = async (rawRequest: RawRequest): Promise<APIGatewayProxyResultV2> => {
    return await unWrappedHandler();
};

export default handler;
