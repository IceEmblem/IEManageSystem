var path = require("path");
var pathMap = require('./src/pathmap.json');

// 路径
var libPath = path.resolve('./src/lib');
var commonPath = path.resolve('./src/Common');
var ManageHomePath = path.resolve('./src/ManageHome');
var nodeModPath = path.resolve(__dirname, './node_modules');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BomPlugin = require('webpack-utf8-bom');    //将文件转成utf-8 bom格式，解决中文乱码的问题
module.exports = {
    entry: { 
        index:__dirname + "/src/index.js",
    },
    output: {
        path: __dirname + "/build/js",
        publicPath: "/js",
        filename: "[name].bundle.js"
        // libraryTarget: 'umd'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.$':'jquery',
            'window.jQuery':'jquery',
            Popper: 'popper',
            // Cookie: "cookie",
            IELib: "ielib",
        }),
        new HtmlWebpackPlugin({
            filename: __dirname + '/build/Index.html',
            template: __dirname + '/src/Index.html', // html模板路径,模板路径是支持传参调用loader的,
            inject: 'body', //打包之后的js插入的位置，true/'head'/'body'/false,
            chunks: ['index', "weatherExport"]
        }),
        new BomPlugin(true, /\.(cshtml)$/),//解决cshtml中文乱码的问题
    ],
    module: {  
        rules: [
            { test: /\.ts[x]?$/, loader: "awesome-typescript-loader" },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
              test: /\.(gif|png|jpe?g|svg)$/i,
              use: [
                  {
                    loader: 'file-loader',
                    options:{
                        name: '/images/[hash].[ext]'
                    }
                  }
              ],
            },
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              use: [
                  {
                    loader: 'file-loader',
                    options:{
                        name: '/fonts/[hash].[ext]'
                    }
                  }
              ]
            },
            {
                test: /\.css$/, 
                loader: 'style-loader!css-loader'
            },
            { 
                test: /\.scss$/, 
                loader: 'style!css!sass'
            }
        ]
    },
    resolve: {
        extensions: ['.js', ".ts", ".tsx", '.jsx', "*", ".css"],
        modules:[libPath, commonPath, ManageHomePath, nodeModPath],
        alias: pathMap
    }
}