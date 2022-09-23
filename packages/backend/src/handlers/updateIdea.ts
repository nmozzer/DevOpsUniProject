import {
    DynamoDBDocumentClient,
    BatchExecuteStatementCommandInput,
    BatchExecuteStatementCommand,
} from '@aws-sdk/lib-dynamodb';
import { AddOrUpdateRequest } from '../types';
import { successResponse } from '../util/apiResponses';

export const updateIdea = async (request: AddOrUpdateRequest, dbClient: DynamoDBDocumentClient, tableName: string) => {
    const { oldName, name, system, beans, difficulty, creator, assigned } = request;

    const query: BatchExecuteStatementCommandInput = {
        Statements: [
            {
                Statement: `DELETE * FROM "${tableName}" where PK=?`,
                Parameters: [{ PK: oldName }],
            },
            {
                Statement: `INSERT INTO "${tableName}" value {'PK':?, 'system':?, 'beans':?, 'difficulty':?, 'creator':?, 'assigned':?}`,
                Parameters: [
                    { S: name },
                    { S: system },
                    { S: beans.toString() },
                    { S: difficulty },
                    { S: creator },
                    { S: assigned.toString() },
                ],
            },
        ],
    };

    console.log(JSON.stringify(query));

    await dbClient.send(new BatchExecuteStatementCommand(query));
    console.log('Updated Item Successfully');

    return successResponse([{}]);
};
