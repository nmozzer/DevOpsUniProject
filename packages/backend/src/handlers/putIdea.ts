import { ExecuteStatementCommand, ExecuteStatementCommandInput } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { FFIdea } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { returnEmptyResponse, returnOriginalItemResponse } from '../util/apiResponses';

export const putIdea = async (dbClient: DynamoDBDocumentClient, tableName: string, idea: FFIdea) => {
    const { name, system, beans, difficulty, creator, assigned } = idea;

    const uid = uuidv4();

    const assignedAsNum: string = assigned ? '1' : '0';

    const query: ExecuteStatementCommandInput = {
        Statement: `INSERT INTO ${tableName} value {'uid':? 'name':?, 'system':?, 'beans':?, 'difficulty':?, 'creator':?, 'assigned':?}`,
        Parameters: [
            { S: uid },
            { S: name },
            { S: system },
            { N: beans },
            { S: difficulty },
            { S: creator },
            { S: assignedAsNum },
        ],
    };

    try {
        const response = await dbClient.send(new ExecuteStatementCommand(query));
        console.log('Added Item Successfully');

        if (!response?.Items) {
            return returnEmptyResponse();
        }

        return returnOriginalItemResponse(response.Items);
    } catch (error) {
        throw new Error(error);
    }
};
