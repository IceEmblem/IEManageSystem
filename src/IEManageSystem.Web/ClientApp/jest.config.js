module.exports = {
    transform: {
        // 以 ts 结尾使用 ts-jest 模块
        '^.+\\.tsx?$': 'ts-jest',
        // 以 js 结尾使用 babel-jest 模块
        "^.+\\.jsx?$": "babel-jest"
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