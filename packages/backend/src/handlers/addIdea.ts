import { AddOrUpdateRequest } from './../types';
import { DynamoDBDocumentClient, ExecuteStatementCommand, ExecuteStatementCommandInput } from '@aws-sdk/lib-dynamodb';
import { successResponse } from '../util/apiResponses';

export const addIdea = async (request: AddOrUpdateRequest, dbClient: DynamoDBDocumentClient, tableName: string) => {
    const { name, system, beans, difficulty, creator, assigned } = request;


    const query: ExecuteStatementCommandInput = {
        Statement: `INSERT INTO "${tableName}" value {'PK':?, 'system':?, 'beans':?, 'difficulty':?, 'creator':?, 'assigned':?}`,
        Parameters: [{ PK: name, system, beans, difficulty, creator, assigned }],
    };

    console.log(query, ' after query');

    const response = await dbClient.send(new ExecuteStatementCommand(query));
    console.log('Added Item Successfully');
    console.log(response);

    return successResponse(response?.Items);
};
