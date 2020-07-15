require("./createComponentDescribesFile");
require("./createModuleListFile");
require("./createTemplateListFile");

const serverProxy = require('http-proxy-middleware')
var path = require("path");
var pathMap = require('./pathmap.json');

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
                    if (process.env.REACT_APP_SERVER) {
                        console.log("use server");

                        app.use(
                            serverProxy(
                                '/api/', {
                                    target: 'http://localhost:5000/',
                                    changeOrigin: true
                                }
                            )
                        )
                    }
                    else {
                        console.log("use webpackserver");

                        // 处理/api开头的post请求
                        app.post(/^\/api/i, function (req, res) {
                            console.log(req.url)

                            // 匹配url
                            let regex = /\/api\/([^\/]*)\/(.*)/i
                            let match = regex.exec(req.url)

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
                    }
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