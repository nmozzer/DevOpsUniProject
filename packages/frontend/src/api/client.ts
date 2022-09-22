import axios from 'axios';

interface FFIdea {
    name: string;
    system: string;
    beans: string;
    difficulty: string;
    creator: string;
    assigned: boolean;
}
export const apiCall = async (route: string, body?: FFIdea): Promise<any> => {
    const apigPrefix = 'https://a18w1fqq8k.execute-api.us-east-1.amazonaws.com';
    const token = window.localStorage.getItem('idToken');

    console.log(token);
    try {
        const response = await axios(`${apigPrefix}${route}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token!,
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
