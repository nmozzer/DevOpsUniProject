import { successResponse } from './../util/apiResponses';
import { DeleteRequest } from './../types';
import { DynamoDBDocumentClient, ExecuteStatementCommand } from '@aws-sdk/lib-dynamodb';
import { ExecuteStatementCommandInput } from '@aws-sdk/client-dynamodb';

export const deleteIdea = async (request: DeleteRequest, dbClient: DynamoDBDocumentClient, tableName: string) => {
    const { nameDeletion } = request;

    if (!nameDeletion) {
        throw new Error('No name provided for deletion');
    }

    const query: ExecuteStatementCommandInput = {
        Statement: `DELETE FROM "${tableName}" where "PK"=?`,
        Parameters: [{ S: nameDeletion }],
    };

    console.log(query, 'DELETE QUERY');

    const response = await dbClient.send(new ExecuteStatementCommand(query));
    console.log('Deleted Successfully');

    return successResponse(response?.Items);
};
