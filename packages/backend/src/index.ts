import { APIGatewayProxyResultV2 } from 'aws-lambda';
import { RawRequest } from './types';

const unwrappedHandler = async () => {
    return {
        statusCode: 200,
        body: 'Hello World',
    };
};

export const handler = async (rawRequest: RawRequest): Promise<APIGatewayProxyResultV2> => {};

export default handler;
