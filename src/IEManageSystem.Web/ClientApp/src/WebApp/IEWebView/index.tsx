import React from 'react'
import { WebViewProps } from 'react-native-webview/index'
export { FileDownload, WebViewMessageEvent, WebViewNavigation, WebViewProps } from 'react-native-webview/index'

class IEWebView extends React.Component<WebViewProps>{
    render() {
        let html:string;
        if(this.props.source){
            html = (this.props.source as any).html;
        }

        return (
            <iframe 
                style={{border:0, width:"100%"}}
                srcDoc={html}
                marginHeight={0}
                marginWidth={0}
            >
            </iframe>
        )
    }
}

export {IEWebView as WebView};
export default IEWebView;