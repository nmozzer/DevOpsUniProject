import { handler } from '../src';

describe('index.ts', () => {
    it('returns Hello World', async () => {
        const result = await handler();

        expect(result.body).toEqual('Hello World');
    });
});
