import { AttributeValue } from '@aws-sdk/client-dynamodb';

export const returnOriginalItemResponse = (idea: Record<string, AttributeValue>[]) => {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(idea),
    };
};

export const returnFetchedItemsResponse = (ideaList: Record<string, AttributeValue>[]) => {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ideaList),
    };
};

export const returnEmptyResponse = () => {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: '',
    };
};
