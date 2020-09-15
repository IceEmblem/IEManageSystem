import React from 'react'
import IComponent from 'IETemplateComponents/RichTextEditor/IComponent'
import WebView from 'react-native-webview'
import { View } from 'react-native'

class Component extends IComponent {
    render() {
        let text = this.getText();

        return (<View style={[this.baseStyle]}>
            <WebView
                source={{ html: text }}
            />
        </View>);
    }
}

export default Component;
