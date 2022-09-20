import { RawRequest } from './../src/types';
import { handler } from '../src';

describe('index.ts', () => {
    it('returns Hello World', async () => {
        const req = {} as RawRequest;
        const result = await handler(req);

        expect(result.body).toEqual('Hello World');
    });
});
