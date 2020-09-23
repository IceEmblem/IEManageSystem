import React from 'react'
import IComponent from 'IETemplateComponents/Text/IComponent'
import StyleCheck from 'RNCMS/StyleCheck'
import { Text, View, StyleSheet } from 'react-native'

const hToFontSize = {
    h1: {text: 27, small: 19},
    h2: {text: 24, small: 17},
    h3: {text: 22, small: 14},
    h4: {text: 18, small: 11},
    other: {text: undefined, small: 8},
}

class Component extends IComponent {
    render() {
        let setting = this.getCurrentSetting();
        let data = this.getCurrentData();

        let style = this.getFontSetting().toStyle();
        let smallStyle = { ...style }

        if(!style.fontSize){
            if(hToFontSize[setting.textType]){
                style.fontSize = hToFontSize[setting.textType].text;
                smallStyle.fontSize = hToFontSize[setting.textType].small;
            }
            else{
                style.fontSize = hToFontSize.other.text;
                smallStyle.fontSize = hToFontSize.other.small;
            }
        }

        let smallText = data.smallText ?
            <Text style={[styles.textSmall, StyleCheck.handle(smallStyle)]}>{data.smallText}</Text> :
            undefined;

        return (
            <View style={[this.baseStyle, styles.view, { justifyContent: setting.align }]}>
                <View>{this.props.children}</View>
                <Text style={[styles.text, StyleCheck.handle(style)]}>{this.getText()}</Text>
                {smallText}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontWeight: '600',
        flexShrink: 1,
    },
    textSmall: {
        marginLeft: 10,
        flexShrink: 1,
    }
});

export default Component;
