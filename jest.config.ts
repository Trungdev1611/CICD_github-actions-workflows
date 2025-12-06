export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'jest-environment-jsdom',
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
          "<rootDir>/src/test/__ mocks __/fileMock.js",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            useESM: true,
        }],
    },
    setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
};