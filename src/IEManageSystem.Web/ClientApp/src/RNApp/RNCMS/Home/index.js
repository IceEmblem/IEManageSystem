import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Link } from 'react-router-native'
import WebView from 'react-native-webview'

const html = `
<div id="canvas" style=""></div>
<script src="https://unpkg.com/@antv/g2plot@latest/dist/g2plot.js"></script>
<script>
    window.onload = function () {
        const data = [
            { year: '1991', value: 3 },
            { year: '1992', value: 4 },
            { year: '1993', value: 3.5 },
            { year: '1994', value: 5 },
            { year: '1995', value: 4.9 },
            { year: '1996', value: 6 },
            { year: '1997', value: 7 },
            { year: '1998', value: 9 },
            { year: '1999', value: 13 },
        ];

        const linePlot = new G2Plot.Line('canvas', {
            data,
            xField: 'year',
            yField: 'value',
        });

        linePlot.render();
    }
</script>
`;

export default class Home extends Component {
  render() {
    return (
      <WebView
        source={{html: html}}
      />
    );
  }
}