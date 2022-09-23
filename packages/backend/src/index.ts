import { updateIdea } from './handlers/updateIdea';
import { addIdea } from './handlers/addIdea';
import { errorResponse, unAuthorizedResponse } from './util/apiResponses';
import { DDB_CLIENT } from './ddbClient';
import { Context, APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { isOptionsRequest, isAdmin, parseSchema } from './util/util';
import { deleteIdea } from './handlers/deleteIdea';
import { deleteSchema, getSchema, addOrUpdateSchema } from './types';
import { getAllIdeas } from './handlers/getAllIdeas';

export const unWrappedHandler = async (
    event: APIGatewayProxyEventV2WithJWTAuthorizer,
    client: DynamoDBClient,
    tableName: string,
): Promise<APIGatewayProxyStructuredResultV2> => {
    if (isOptionsRequest(event)) {
        return { statusCode: 200 };
    }

    const { rawPath } = event;
    const isUserAdmin = isAdmin(event);

    if (rawPath === '/getAllIdeas') {
        try {
            parseSchema(getSchema, event.body);
            return await getAllIdeas(client, tableName);
        } catch (error) {
            return errorResponse(error);
        }
    }

    if (rawPath === '/addIdea') {
        try {
            const request = parseSchema(addOrUpdateSchema, event.body);

            return await addIdea(request, client, tableName);
        } catch (error) {
            return errorResponse(error);
        }
    }

    if (rawPath === '/updateIdea') {
        if (!isUserAdmin) {
            return unAuthorizedResponse();
        }

        try {
            const request = parseSchema(addOrUpdateSchema, event.body);
            console.log(request);

            return await updateIdea(request, client, tableName);
        } catch (error) {
            return errorResponse(error);
        }
    }

    if (rawPath === '/deleteIdea') {
        if (!isUserAdmin) {
            return unAuthorizedResponse();
        }

        try {
            const request = parseSchema(deleteSchema, event.body);
            console.log(request);
            return await deleteIdea(request, client, tableName);
        } catch (error) {
            return errorResponse(error);
        }
    }

    return {
        statusCode: 404,
        body: 'Route does not exist',
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

const TABLE_NAME = process.env.FF_TABLE;

export const handler = async (
    event: APIGatewayProxyEventV2WithJWTAuthorizer,
    _context: Context,
): Promise<APIGatewayProxyStructuredResultV2> => {
    if (!TABLE_NAME) {
        throw new Error('Must provide table name');
    }
    return await unWrappedHandler(event, DDB_CLIENT, TABLE_NAME);
};

export default handler;
