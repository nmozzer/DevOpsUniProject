import { ExecuteStatementCommand, ExecuteStatementCommandInput } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { returnEmptyResponse, returnFetchedItemsResponse } from '../util/apiResponses';

export const getAllIdeas = async (dbClient: DynamoDBDocumentClient, tableName: string) => {
    const query: ExecuteStatementCommandInput = {
        Statement: `SELECT * FROM ${tableName}`,
    };

    try {
        const response = await dbClient.send(new ExecuteStatementCommand(query));
        console.log('Retrieved Items Successfully');

        if (!response?.Items) {
            return returnEmptyResponse();
        }

        return returnFetchedItemsResponse(response.Items);
    } catch (error) {
        throw new Error(error);
    }
};
