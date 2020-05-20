require("./createComponentDescribesFile");
require("./createModuleListFile");

var path = require("path");
var pathMap = require('./src/lib/pathmap.json');

// 路径
var srcPath = path.resolve('./src');
var libPath = path.resolve('./src/lib');
var commonPath = path.resolve('./src/Common');
var nodeModPath = path.resolve(__dirname, './node_modules');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    webpack: function (config, env) {
        config.plugins = [
            ...config.plugins,
            new webpack.ProvidePlugin({
                IELib: "ielib",
            }),
            new HtmlWebpackPlugin({
                filename: __dirname + '/build/index.html',
                template: __dirname + '/src/Start/index.html', // html模板路径,模板路径是支持传参调用loader的,
                inject: 'body', //打包之后的js插入的位置，true/'head'/'body'/false,
                chunks: ['index', "weatherExport"]
            })
        ];

        config.resolve.modules = [
            ...config.resolve.modules,
            srcPath, libPath, commonPath, nodeModPath
        ];

        config.resolve.alias = pathMap;

        if (process.env.NODE_ENV != "production") {

        }

        return config;
    },
    devServer: function (configFunction) {
        return function (proxy, allowedHost) {

            // 将AnalogData文件夹的json文件require到data中
            const datas = require('require-all')({
                dirname: __dirname + '/AnalogData',
            });

            const config = {
                contentBase: './build',
                // port: 9000,
                before: function (app) {
                    // 处理/api开头的post请求
                    app.post(/^\/api/i, function (req, res) {
                        console.log(req.url)

                        // 匹配url
                        let regex = /\/api\/([^\/]*)\/(.*)/i
                        let match = regex.exec(req.url)
                        console.log(match);
                        if (match == null || match.isSuccess == false) {
                            res.json({
                                success: true,
                                result: {
                                }
                            });
                            return;
                        }

                        // /api/controller/action 匹配controller
                        let file = match[1]
                        // /api/controller/action 匹配action
                        let name = match[2]

                        res.json({
                            success: true,
                            result: (datas[file] || {})[name]
                        });
                    });
                },
                historyApiFallback: {
                    //使用正则匹配命中路由
                    rewrites: [
                        { from: /^\//, to: '/index.html' },
                    ]
                }
            }

            return config;
        };
    },
}