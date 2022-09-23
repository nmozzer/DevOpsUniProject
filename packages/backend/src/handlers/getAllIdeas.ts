import { DynamoDBDocumentClient, ExecuteStatementCommand, ExecuteStatementCommandInput } from '@aws-sdk/lib-dynamodb';
import { successResponse } from '../util/apiResponses';

export const getAllIdeas = async (dbClient: DynamoDBDocumentClient, tableName: string) => {
    const query: ExecuteStatementCommandInput = {
        Statement: `SELECT * FROM "${tableName}"`,
    };

    const response = await dbClient.send(new ExecuteStatementCommand(query));
    console.log('Retrieved Items Successfully');

    return successResponse(response?.Items);
};
