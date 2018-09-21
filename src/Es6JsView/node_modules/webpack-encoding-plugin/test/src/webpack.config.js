/**
 * Created by pd06093 on 12.11.2015.
 */

var path = require("path");

var encodingPlugin = require('../..');

module.exports = {
    entry: './test.js',
    output: {
        path: '../dist',
        filename: 'bundle.js'
    },

    plugins: [new encodingPlugin('iso-8859-1')]
};