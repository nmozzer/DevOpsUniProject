module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/tst'],
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
