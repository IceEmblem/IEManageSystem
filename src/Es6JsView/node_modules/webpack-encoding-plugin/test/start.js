/**
 * Created by pd06093 on 12.11.2015.
 */

var webpack = require("webpack");
var path = require("path");

var encodingPlugin = require('..');

webpack({
    context: __dirname,
    entry : './src/test.js',
    output : {
        path : 'dist',
        filename: 'bundle.js'
    },
    resolveLoader : {
        root : path.join(__dirname, '../node_modules')

    },

    plugins : [  new encodingPlugin('iso-8859-1')]
}, function(){});
