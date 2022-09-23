import axios from 'axios';
import { Difficulty } from '../components/form/ideaValidationHooks';

export interface FFIdea {
    PK?: string;
    name?: string;
    oldName?: string;
    system: string;
    beans: number;
    difficulty: Difficulty;
    creator: string;
    assigned: boolean;
}

export interface DeleteFFIdea {
    nameDeletion: string;
}

export const apiCall = async (route: string, body?: FFIdea | DeleteFFIdea): Promise<any> => {
    const apigPrefix = 'https://a18w1fqq8k.execute-api.us-east-1.amazonaws.com';
    const token = window.localStorage.getItem('idToken');

    try {
        const response = await axios(`${apigPrefix}${route}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token!,
                'Access-Control-Allow-Origin': '*',
            },
            data: body || {},
        });
        console.log(response?.data, 'RESPONSE');

        return response?.data;
    } catch (error) {
        throw error;
    }
};
