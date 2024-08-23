module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/src/tests/**/*.test.ts'],
    globals: {
      'ts-jest': {
        isolatedModules: true,
      },
    },
  };
  