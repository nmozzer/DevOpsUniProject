import { AttributeValue, ExecuteStatementCommand, ExecuteStatementCommandInput } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { successResponse } from '../util/apiResponses';
import { unmarshall } from '@aws-sdk/util-dynamodb';

export const getAllIdeas = async (dbClient: DynamoDBDocumentClient, tableName: string) => {
    const query: ExecuteStatementCommandInput = {
        Statement: `SELECT * FROM "${tableName}"`,
    };

    const response = await dbClient.send(new ExecuteStatementCommand(query));
    console.log('Retrieved Items Successfully');

    const unMarshalledResponse = unMarshallResponse(response?.Items);

    return successResponse(unMarshalledResponse);
};

const unMarshallResponse = (items?: Record<string, AttributeValue>[]) => {
    return items?.map((item) => unmarshall(item));
};
