import { ExecuteStatementCommand, ExecuteStatementCommandInput } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const deleteIdea = async (dbClient: DynamoDBDocumentClient, tableName: string, uid: string) => {
    const query: ExecuteStatementCommandInput = {
        Statement: `DELETE * FROM ${tableName} where uid=?`,
        Parameters: [{ S: uid }],
    };

    try {
        const response = await dbClient.send(new ExecuteStatementCommand(query));
        console.log('Deleted Item Successfully');
        return response;
    } catch (error) {
        throw new Error(error);
    }
};
