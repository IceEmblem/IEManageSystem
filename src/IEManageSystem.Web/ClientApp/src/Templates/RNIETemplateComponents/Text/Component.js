import React from 'react'
import IComponent from 'IETemplateComponents/Text/IComponent'

import { Text, View, StyleSheet } from 'react-native'

class Component extends IComponent {
    render() {
        let setting = this.getCurrentSetting();
        let data = this.getCurrentData();

        let style = { color: setting.fontColor }
        let smallStyle = { color: setting.fontColor, marginLeft: 10 }

        if (setting.textType == "h1") {
            style.fontSize = 27;

            smallStyle.fontSize = 19;
        }
        else if (setting.textType == "h2") {
            style.fontSize = 24;

            smallStyle.fontSize = 17;
        }
        else if (setting.textType == "h3") {
            style.fontSize = 21;

            smallStyle.fontSize = 14;
        }
        else if (setting.textType == "h4") {
            style.fontSize = 18;

            smallStyle.fontSize = 11;
        }
        else {
            smallStyle.fontSize = 8;
        }

        let smallText = data.smallText ?
            <Text style={[styles.textSmall, smallStyle]}>{data.smallText}</Text> :
            undefined;

        return (
            <View style={[this.baseStyle, styles.view, { justifyContent: setting.align }]}>
                <View>{this.props.children}</View>
                <Text style={[styles.text, style]}>{this.getText()}</Text>
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
