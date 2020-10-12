import React from 'react'
import WebView from 'react-native-webview'

interface Props {
    html: string
}

export default class IEWebView extends React.Component<Props> {
    state = {
        webHeight: 0
    }

    constructor(props) {
        super(props);
    }

    createHtml(html) {
        return `
        <body style="margin: 0px">
            <div id="__container__">
                ${html}
                <div></div>
            </div>
            <script>
                var oldonload = window.onload;//得到上一个onload事件的函数

                window.onload = function () {
                    if (typeof oldonload == 'function') {
                        oldonload();
                    } 

                    setTimeout(()=>{
                        // 向 WebView 发送消息
                        let webHeight = document.getElementById("__container__").clientHeight;
                        window.ReactNativeWebView.postMessage(webHeight);
                    }, 1)
                }
            </script>
        <body>
        `
    }

    onMessage = (msg) => {
        if (msg.nativeEvent.data !== undefined && msg.nativeEvent.data !== null) {
            let height = parseInt(msg.nativeEvent.data);
            if (isNaN(height)) {
                height = 0;
            }
            this.setState({
                webHeight: height
            });
        }
    }

    render() {
        return (
            <WebView
                style={{ width: '100%', height: this.state.webHeight }}
                javaScriptEnabled={true}
                source={{ html: this.createHtml(this.props.html) }}
                onMessage={this.onMessage}
                scalesPageToFit={false}
            />
        );
    }
}
