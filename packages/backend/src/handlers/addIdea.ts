import { AddOrUpdateRequest } from './../types';
import { ExecuteStatementCommand, ExecuteStatementCommandInput } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { successResponse } from '../util/apiResponses';

export const addIdea = async (request: AddOrUpdateRequest, dbClient: DynamoDBDocumentClient, tableName: string) => {
    const { name, system, beans, difficulty, creator, assigned } = request;
    console.log('after request destructure');


    const assignedAsNum: string = assigned ? '1' : '0';

    const query: ExecuteStatementCommandInput = {
        Statement: `INSERT INTO "${tableName}" value {'PK':?, 'system':?, 'beans':?, 'difficulty':?, 'creator':?, 'assigned':?}`,
        Parameters: [{ S: name }, { S: system }, { N: beans }, { S: difficulty }, { S: creator }, { S: assignedAsNum }],
    };

    const response = await dbClient.send(new ExecuteStatementCommand(query));
    console.log('Added Item Successfully');

    return successResponse(response?.Items);
};
