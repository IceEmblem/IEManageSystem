import React from 'react'
import IComponent from 'IETemplateComponents/Text/IComponent'
import StyleCheck from 'RNCMS/StyleCheck'
import { Text, View, StyleSheet } from 'react-native'

const hToFontSize = {
    h1: {text: 38, small: 31, fontWeight: '600'},
    h2: {text: 30, small: 24, fontWeight: '600'},
    h3: {text: 24, small: 20, fontWeight: '600'},
    h4: {text: 20, small: 16, fontWeight: '600'},
    other: {text: 14, small: 12, fontWeight: '400'},
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
                style.fontWeight = hToFontSize[setting.textType].fontWeight;
                smallStyle.fontSize = hToFontSize[setting.textType].small;
            }
            else{
                style.fontSize = hToFontSize.other.text;
                smallStyle.fontSize = hToFontSize.other.small;
                style.fontWeight = hToFontSize.other.fontWeight;
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
