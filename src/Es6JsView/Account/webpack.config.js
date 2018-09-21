var path = require("path");
var pathMap = require('./Account/pathmap.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var BomPlugin = require('webpack-utf8-bom');    //将文件转成utf-8 bom格式，解决中文乱码的问题
module.exports = {
    devtool: 'source-map',
    entry: { 
        account:__dirname + "/Account/account.jsx"
    },
    output: {
        path: __dirname + "/../IEManageSystem.Web/wwwroot/js/Account",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    plugins: [       //生成html
        //这里开始写
        new HtmlWebpackPlugin({
            filename: __dirname + '/../IEManageSystem.Web/Views/Account/Login.cshtml',
            template: __dirname + '/Account/login.html', // html模板路径,模板路径是支持传参调用loader的,
            inject: 'body', //打包之后的js插入的位置，true/'head'/'body'/false,
            chunks: ['account']
        }),
        new BomPlugin(true, /\.(cshtml)$/),//解决cshtml中文乱码的问题
    ],
    module: {  
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js',"*",".css"],
        alias: pathMap
    }
}