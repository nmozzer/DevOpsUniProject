import { getSession } from './../cognito/cognito';
import { FFIdea } from './../../../backend/src/types';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

export const apiCall = async (route: string, body?: FFIdea): Promise<FFIdea> => {
    const apigPrefix = 'https://eqj4eftqec.execute-api.us-east-1.amazonaws.com';

    const session = (await getSession()) as CognitoUserSession;
    const jwtToken = session.getIdToken().getJwtToken();

    const response = await fetch(`${apigPrefix}${route}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: jwtToken,
        },
        body: JSON.stringify(body || ''),
    });

    if (!response.ok) {
        throw new Error('Problem calling ' + route);
    }

    console.log(response.json());
    return response.json();
};
