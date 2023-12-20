module.exports = {
    preset: 'react-native',
    testPathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/node_modules/', '<rootDir>/example/'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
