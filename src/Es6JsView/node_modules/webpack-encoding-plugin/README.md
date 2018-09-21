# Webpack Encoding Plugin

Take control over the encoding of emitted webpack assets.
This can be useful, if the delivering webserver enforces a specific content-type, 
so that your js-code is not interpreted as utf-8 by the browser.

## Usage

install module

    npm install webpack-encoding-plugin
    
setup webpack config
   
``` javascript
var EncodingPlugin = require('webpack-encoding-plugin');
module.exports = {
    entry: './entry.js',
    output: {
        path: '../dist',
        filename: 'bundle.js'
    },
    plugins: [new EncodingPlugin({
      encoding: 'iso-8859-1'
    })]
};
```

Additional options:

`test`, `include`, `exclude` RegExp or array of RegExps to filter processed files
(default `test` is `/(\.js|\.css)($|\?)/i`)

## Encodings

The Plugin uses [iconv-lite](https://www.npmjs.com/package/iconv-lite) to handle the encoding.
A list of supported encodings can be found [here](https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings)