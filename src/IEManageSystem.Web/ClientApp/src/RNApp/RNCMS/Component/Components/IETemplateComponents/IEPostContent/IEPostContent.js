import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEPostContent/IComponent'
import { StyleSheet, View, Text } from 'react-native'
import WebView from 'react-native-webview'

class IEPostContent extends IComponent {
    state = {
        height: undefined
    }

    constructor(props) {
        super(props);
    }

    handleHtml(html) {
        return `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                html,
                body {
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div id="__WebView__">
                ${html}
            </div>
            <script>
                window.onload = function () { 
                    window.ReactNativeWebView.postMessage(document.getElementById("__WebView__").offsetHeight)
                }
            </script>
        </body>
        </html>
        `
    }

    render() {
        let text = this.props.pageData.content || `
        <div style="display: table; width: 100%;">
            <div style="display: table-cell;width: 100%;vertical-align: top;">
                <h3 style="width: 38%;height: 16px;margin-top: 16px;background: #f2f2f2;"></h3>
                <ul style="margin-top: 24px;padding: 0px;">
                    <li style="width: 100%;height: 16px;list-style: none;background: #f2f2f2;margin-top: 16px;"></li>
                    <li style="width: 100%;height: 16px;list-style: none;background: #f2f2f2;margin-top: 16px;"></li>
                    <li style="width: 61%;height: 16px;list-style: none;background: #f2f2f2;margin-top: 16px;"></li>
                </ul>
            </div>
        </div>
        `;

        return (
            <View style={[this.baseStyle, styles.view, { height: this.state.height }]}>
                <WebView
                    source={{ html: this.handleHtml(text) }}
                    onMessage={(msg) => {
                        if (msg.nativeEvent.data !== undefined && msg.nativeEvent.data !== null) {
                            let height = parseInt(msg.nativeEvent.data);
                            if(!isNaN(height)){
                                this.setState({
                                    height: height
                                })
                            }
                        }
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center'
    }
});

IEPostContent.defaultProps = {
};

export default (register) => register(IComponent, IEPostContent);
