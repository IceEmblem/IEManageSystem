const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 将AnalogData文件夹的json文件require到data中
const datas = require('require-all')({
    dirname: __dirname + '/AnalogData',
})

console.log(datas);

module.exports = merge(common, {
    devtool: 'inline-source-map',
    mode: "development",
    devServer: {
        contentBase: './build',
        port: 9000,
        before: function (app) {
            // 处理/api开头的post请求
            app.post(/^\/api/i, function (req, res) {
                console.log(req.url)

                // 匹配url
                let regex = /\/api\/([^\/]*)\/(.*)/i
                let match = regex.exec(req.url)
                console.log(match);
                if(match == null || match.isSuccess ==false){
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
                { from: /^\//, to: '/Index.html' },
            ]
        }
    }
});