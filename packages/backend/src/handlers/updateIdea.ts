import { DynamoDBDocumentClient, ExecuteStatementCommandInput } from '@aws-sdk/lib-dynamodb';
import { ExecuteStatementCommand } from '@aws-sdk/client-dynamodb';
import { AddOrUpdateRequest } from '../types';
import { successResponse } from '../util/apiResponses';

export const updateIdea = async (request: AddOrUpdateRequest, dbClient: DynamoDBDocumentClient, tableName: string) => {
    const { oldName, system, beans, difficulty, creator, assigned } = request;

    if (!oldName) {
        throw new Error('Must provide previous PK');
    }

    const query: ExecuteStatementCommandInput = {
        Statement: `UPDATE "${tableName}" 
        SET system=? 
        SET beans=? 
        SET difficulty=? 
        SET creator=? 
        SET assigned=? 
        where PK=?`,
        Parameters: [
            { S: system },
            { S: beans.toString() },
            { S: difficulty },
            { S: creator },
            { S: assigned.toString() },
            { S: oldName },
        ],
    };

    const response = await dbClient.send(new ExecuteStatementCommand(query));
    console.log('Updated Item Successfully');

    return successResponse(response?.Items);
};
