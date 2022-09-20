import { returnOriginalItemResponse } from './../util/apiResponses';
import { ExecuteStatementCommand, ExecuteStatementCommandInput } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { FFIdea } from '../types';
import { returnEmptyResponse } from '../util/apiResponses';

export const updateIdea = async (dbClient: DynamoDBDocumentClient, tableName: string, idea: FFIdea) => {
    const { uid, name, system, beans, difficulty, creator, assigned } = idea;

    const assignedAsNum: string = assigned ? '1' : '0';

    const query: ExecuteStatementCommandInput = {
        Statement: `UPDATE ${tableName} SET {'uid':? 'name':?, 'system':?, 'beans':?, 'difficulty':?, 'creator':?, 'assigned':?} where uid=?`,
        Parameters: [
            { S: uid! },
            { S: name },
            { S: system },
            { N: beans },
            { S: difficulty },
            { S: creator },
            { S: assignedAsNum },
            { S: uid! },
        ],
    };

    try {
        const response = await dbClient.send(new ExecuteStatementCommand(query));
        console.log('Updated Item Successfully');

        if (!response?.Items) {
            return returnEmptyResponse();
        }

        return returnOriginalItemResponse(response.Items);
    } catch (error) {
        throw new Error(error);
    }
};
