import { getSession } from './../cognito/cognito';
import { FFIdea } from './../../../backend/src/types';

export const apiCall = async (route: string, token: string, body?: FFIdea): Promise<FFIdea> => {
    const apigPrefix = 'https://eqj4eftqec.execute-api.us-east-1.amazonaws.com';

    console.log(token);

    const response = await fetch(`${apigPrefix}${route}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        },
        body: JSON.stringify(body || ''),
    });

    if (!response.ok) {
        throw new Error('Problem calling ' + route);
    }

    console.log(response.json());
    return response.json();
};
