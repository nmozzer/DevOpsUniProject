import { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { z } from 'zod';

export const isOptionsRequest = (event: APIGatewayProxyEventV2WithJWTAuthorizer): boolean => {
    return event.requestContext.http.method === 'OPTIONS' ? true : false;
};

export const isAdmin = (event: APIGatewayProxyEventV2WithJWTAuthorizer): boolean => {
    const groups = event.requestContext.authorizer.jwt.claims['cognito:groups'] as string | undefined;
    console.log(JSON.stringify(event));

    if (!groups) {
        throw new Error('User not part of a group');
    }

    return groups.includes('Admin');
};

export const parseSchema = (schema: z.Schema, body?: string) => {
    if (!body) {
        throw new Error('Expected request to have a body');
    }

    const parsedBody = JSON.parse(body);
    return schema.safeParse(parsedBody);
};
