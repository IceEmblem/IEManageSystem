var path = require("path");
var pathMap = require('./ManageHome/pathmap.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var BomPlugin = require('webpack-utf8-bom');    //将文件转成utf-8 bom格式，解决中文乱码的问题
module.exports = {
    devtool: 'source-map',
    mode:"development",
    entry: { 
        adminiHome:__dirname + "/ManageHome/ManageHome.jsx"
    },
    output: {
        //path: __dirname + "/public",
        path: __dirname +"/../IEManageSystem.Web/wwwroot/js/ManageHome",//打包后的文件存放的地方
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    plugins: [       //生成html
        //这里开始写
        new HtmlWebpackPlugin({
            filename: __dirname + '/../IEManageSystem.Web/Views/ManageHome/Index.cshtml',
            template: __dirname + '/ManageHome/ManageHome.html', // html模板路径,模板路径是支持传参调用loader的,
            inject: 'body', //打包之后的js插入的位置，true/'head'/'body'/false,
            chunks: ['adminiHome']
        }),
        new BomPlugin(true, /\.(cshtml)$/),//解决cshtml中文乱码的问题
    ],
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
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