import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

export const successResponse = (
    ideaList?: Record<string, AttributeValue>[] | {}[],
): APIGatewayProxyStructuredResultV2 => {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ideaList),
    };
};

export const unAuthorizedResponse = (): APIGatewayProxyStructuredResultV2 => {
    return {
        statusCode: 401,
        headers: {
            'Content-Type': 'application/json',
        },
        body: 'Must be admin to perform this action',
    };
};


export const errorResponse = (error: Error):APIGatewayProxyStructuredResultV2 => {
    return {
        statusCode:500,
        headers: {
            'Content-Type': 'application/json',
        },
        body: `Something went wrong: ${error}`
    }
}


