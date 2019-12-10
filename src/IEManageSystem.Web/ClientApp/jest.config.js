module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // 源码搜索路径
    modulePaths:[
        "<rootDir>/src/",
        "<rootDir>/src/ManageHome/",
        "<rootDir>/src/lib/",
        "<rootDir>/src/Common/"
    ]
}