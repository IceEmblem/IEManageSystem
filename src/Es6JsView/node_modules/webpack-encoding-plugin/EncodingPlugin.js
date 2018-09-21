var fs = require('fs');
var RawSource = require('webpack-sources').RawSource;
var SourceMapSource = require('webpack-sources').SourceMapSource;
var encoding = require('encoding');
var ModuleFilenameHelpers = require('webpack').ModuleFilenameHelpers;
if (!ModuleFilenameHelpers) {
    // See https://github.com/webpack/webpack/issues/2640
    ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers');
}

function EncodingPlugin(options) {
    if (typeof options === 'string') {
        this.options = {
            encoding: options
        };
    } else {
        this.options = options || {};
    }
}

EncodingPlugin.prototype.apply = function (compiler) {
    var options = this.options;
    options.test = options.test || /(\.js|\.css)($|\?)/i;

    var matchFileName = ModuleFilenameHelpers.matchObject.bind(undefined, options);

    compiler.plugin('emit', function(compilation, callback) {
        var files = Object.keys(compilation.assets).filter(matchFileName);
        files.forEach(function(file) {
            var asset = compilation.assets[file];
            try {
                var source, map;
                if (asset.sourceAndMap) {
                    var sourceAndMap = asset.sourceAndMap();
                    source = sourceAndMap.source;
                    map = sourceAndMap.map;
                } else {
                    source = asset.source();
                    map = typeof asset.map === 'function' ?
                        asset.map() :
                        null;
                }

                var encodedSource = encoding.convert(source, options.encoding, 'UTF-8');
                if (asset.existsAt && fs.existsSync(asset.existsAt)) {
                    fs.writeFileSync(asset.existsAt, encodedSource);
                }

                compilation.assets[file] = map ?
                  new SourceMapSource(encodedSource, file, map) :
                  new RawSource(encodedSource);

            } catch (e) {
                compilation.errors.push(new Error(file + ' from EncodingPlugin: ' + e.message));
            }
        });

        console.log('Assets converted to ' + options.encoding);
        callback();
    });
};

module.exports = EncodingPlugin;
