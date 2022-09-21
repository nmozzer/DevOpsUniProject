import { successResponse } from './../util/apiResponses';
import { DeleteRequest } from './../types';
import { ExecuteStatementCommand, ExecuteStatementCommandInput } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const deleteIdea = async (request: DeleteRequest, dbClient: DynamoDBDocumentClient, tableName: string) => {
    const { nameDeletion } = request;

    if (nameDeletion) {
        throw new Error('No name provided for deletion');
    }

    const query: ExecuteStatementCommandInput = {
        Statement: `DELETE * FROM ${tableName} where PK=?`,
        Parameters: [{ S: nameDeletion }],
    };

    const response = await dbClient.send(new ExecuteStatementCommand(query));
    console.log('Added Deleted Successfully');

    return successResponse(response?.Items);
};
