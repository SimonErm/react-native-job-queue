module.exports = {
    preset: 'react-native',
    transform: {
        '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js'
    },
    testPathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/node_modules/', '<rootDir>/example/'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
