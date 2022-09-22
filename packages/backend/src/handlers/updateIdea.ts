import { ExecuteStatementCommand, ExecuteStatementCommandInput } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { AddOrUpdateRequest } from '../types';
import { successResponse } from '../util/apiResponses';

export const updateIdea = async (request: AddOrUpdateRequest, dbClient: DynamoDBDocumentClient, tableName: string) => {
    const { name, system, beans, difficulty, creator, assigned } = request;

    const assignedAsNum: string = assigned ? '1' : '0';

    const query: ExecuteStatementCommandInput = {
        Statement: `UPDATE "${tableName}" SET {'PK':?, 'system':?, 'beans':?, 'difficulty':?, 'creator':?, 'assigned':?} where PK=?`,
        Parameters: [
            { S: name },
            { S: system },
            { N: beans },
            { S: difficulty },
            { S: creator },
            { S: assignedAsNum },
            { S: name },
        ],
    };

    const response = await dbClient.send(new ExecuteStatementCommand(query));
    console.log('Updated Item Successfully');

    return successResponse(response?.Items);
};
