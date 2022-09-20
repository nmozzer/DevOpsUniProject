import { getSession } from './../cognito/cognito';
import { FFIdea } from './../../../backend/src/types';

import axios from 'axios';

export const apiCall = async (route: string, token: string, body?: FFIdea): Promise<FFIdea> => {
    const apigPrefix = 'https://4jk16o282g.execute-api.us-east-1.amazonaws.com';

    console.log(token);
    try {
        const response = await axios(`${apigPrefix}${route}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
                'Access-Control-Allow-Origin': '*',
            },
            data: JSON.stringify(body || ''),
        });
        console.log(response.data, 'RESPONSE');

        return response.data;
    } catch (error) {
        throw error;
    }
};
