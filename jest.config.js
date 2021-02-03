module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['jest-extended'],
    testPathIgnorePatterns: ['/.stryker-tmp', '/dist/', '/node_modules/'],
    coverageDirectory: 'reports/coverage/unit',
    collectCoverageFrom: [
        'src/**/*.ts'
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    },
    reporters: [
        'default',
        ['jest-junit', { output: 'reports/tests/unit-test-evidence.xml' }]
    ]
}