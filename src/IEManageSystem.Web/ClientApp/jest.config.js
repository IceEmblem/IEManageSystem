module.exports = {
    transform: {
        // 以 ts 结尾使用 ts-jest 模块
        '^.+\\.tsx?$': 'ts-jest',
        // 以 js 结尾使用 babel-jest 模块
        "^.+\\.jsx?$": "babel-jest"
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // 与测试无关的资源文件过滤掉
    moduleNameMapper: {  
        // ResourceFilter是自定义的文件，什么都没写
        '\\.(css|less|gif|jpg|jpeg|png)$': '<rootDir>/test/ResourceFilter.js',
    },
    // 源码搜索路径
    modulePaths: [
        "<rootDir>/src/",
        "<rootDir>/src/lib/",
        "<rootDir>/src/Common/",
        "<rootDir>/test/"
    ]
}