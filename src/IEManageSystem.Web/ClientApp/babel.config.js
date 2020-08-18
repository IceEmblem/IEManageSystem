module.exports = {
    presets: [
        "react-app",
        "module:metro-react-native-babel-preset"
    ],
    plugins: [
        [
            "import",
            {
                "libraryName": "@ant-design/react-native"
            }
        ],
        [
            "import",
            {
                "libraryName": "antd",
                "libraryDirectory": "lib"
            },
            "antd"
        ],
        [
            "module-resolver",
            {
                "root": [
                    "src/Common",
                    "src/RNApp",
                    "src/WebApp",
                    "src/Assets"
                ],
                "extensions": [
                    ".js",
                    ".jsx",
                    ".ts",
                    ".tsx"
                ]
            }
        ]
    ]
}