require('module-alias/register')

// use this array to add ES Modules to ignore
const esModules = []

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  globals: {
    'vue-jest': {
      pug: { doctype: 'html' }
    }
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: ['<rootDir>/tests/**/*.(spec|test).js', '<rootDir>/src/**/__tests__/*.(spec|test).js'],
  moduleFileExtensions: ['vue', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '.*\\.vue$': 'vue-jest',
    '.*\\.js$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  },
  transformIgnorePatterns: (esModules?.length && [`<rootDir>/node_modules/(?!(${esModules.join('|')}))`]) || [],

  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.vue', '<rootDir>/src/**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '.d.ts$']
}
