var path = require("path");
var pathMap = require('./SelectSingleData/pathmap.json');
const HtmlWebpackPlugin = require('html-webpack-plugin')
var BomPlugin = require('webpack-utf8-bom');    //将文件转成utf-8 bom格式，解决中文乱码的问题
module.exports = {
    // // 开发环境
    // devtool: 'source-map',
    // mode:"development",
    // 生产环境
    devtool:'cheap-module-source-map',
    entry: { 
        selectSingleData:__dirname + "/SelectSingleData/SelectSingleData.js"
    },
    output: {
        //path: __dirname + "/public",
        path: __dirname +"/../IEManageSystem.Web/wwwroot/js/Other",//打包后的文件存放的地方
        filename: "[name].js",
        chunkFilename: "[id].js",
        libraryTarget: 'umd'
    },
    // plugins: [       //生成html
    //     //这里开始写
    //     new HtmlWebpackPlugin({
    //         filename: __dirname + '/SelectSingleData/bulider/SingleData.html',
    //         template: __dirname + '/SelectSingleData/SingleData.html', // html模板路径,模板路径是支持传参调用loader的,
    //         inject: 'body', //打包之后的js插入的位置，true/'head'/'body'/false,
    //         chunks: ['selectSingleData']
    //     }),
    //     new BomPlugin(true, /\.(cshtml)$/),//解决cshtml中文乱码的问题
    // ],
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
            },
            {
                test: /\.css$/, 
                loader: 'style-loader!css-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js',"*",".css"],
        alias: pathMap
    }
}