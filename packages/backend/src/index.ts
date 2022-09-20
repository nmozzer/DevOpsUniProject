import { DDB_CLIENT } from './ddbClient';
import { APIGatewayProxyResultV2 } from 'aws-lambda';
import { RawRequest } from './types';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

// interface APIRequest {
//     idea: FFIdea;
//     isAdmin: boolean;
// }

const unWrappedHandler = async (
    client: DynamoDBClient,
    tableName: string,
    // idea: FFIdea,
    // isAdmin: boolean,
    // rawPath: string,
) => {
    // if (rawPath === '/deleteIdea' && isAdmin) {
    //     return await deleteIdea(client, tableName, idea);
    // }

    // if (rawPath === '/updateIdea' && isAdmin) {
    //     return await updateIdea(client, tableName, idea);
    // }

    // if (rawPath === '/getAllIdeas') {
    //     return await getAllIdeas(client, tableName);
    // }

    // if (rawPath === '/putIdea') {
    //     return await putIdea(client, tableName, idea);
    // }

    return {
        statusCode: 200,
        body: 'HelloWorld',
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

const TABLE_NAME = process.env.FF_TABLE;

export const handler = async (rawRequest: RawRequest): Promise<APIGatewayProxyResultV2> => {
    // const { body, rawPath } = rawRequest;

    // const { isAdmin, idea } = JSON.parse(body) as APIRequest;

    return await unWrappedHandler(DDB_CLIENT, TABLE_NAME);
};

export default handler;
