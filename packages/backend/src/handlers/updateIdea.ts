import { DynamoDBDocumentClient, ExecuteStatementCommand, ExecuteStatementCommandInput } from '@aws-sdk/lib-dynamodb';
import { AddOrUpdateRequest } from '../types';
import { successResponse } from '../util/apiResponses';

export const updateIdea = async (request: AddOrUpdateRequest, dbClient: DynamoDBDocumentClient, tableName: string) => {
    const { name, system, beans, difficulty, creator, assigned } = request;

    const query: ExecuteStatementCommandInput = {
        Statement: `UPDATE "${tableName}" SET {'PK':?, 'system':?, 'beans':?, 'difficulty':?, 'creator':?, 'assigned':?} where PK=?`,
        Parameters: [{ PK: name, system, beans, difficulty, creator, assigned }],
    };

    const response = await dbClient.send(new ExecuteStatementCommand(query));
    console.log('Updated Item Successfully');

    return successResponse(response?.Items);
};
