import React from 'react'
import IComponent from 'IETemplateComponents/RichTextEditor/IComponent'
import WebView from 'RNInfrastructure/IEWebView'
import { View } from 'react-native'

class Component extends IComponent {
    render() {
        return (<View style={[this.baseStyle]}>
            <WebView
                html={this.getText()}
            />
        </View>);
    }
}

export default Component;
