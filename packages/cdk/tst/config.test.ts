import { CONFIG } from '../lib/config';

describe('CONFIG', () => {
    it('Has expected values defined', () => {
        const { hostedZoneId, hostedZoneName, account, region } = CONFIG;

        expect(hostedZoneId).toBeDefined();
        expect(hostedZoneName).toBeDefined();
        expect(account).toBeDefined();
        expect(region).toBeDefined();
    });
});
