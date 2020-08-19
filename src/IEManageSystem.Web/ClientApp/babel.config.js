if(process.env.IEOS == 'web'){
    presets = ["react-app", "module:metro-react-native-babel-preset"]
}
else if(process.env.IEOS == 'android' || process.env.IEOS == 'ios'){
    presets = ["module:metro-react-native-babel-preset"]
}


module.exports = {
    presets: presets,
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
                    // "src/Common",
                    // "src/RNApp",
                    // "src/WebApp",
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