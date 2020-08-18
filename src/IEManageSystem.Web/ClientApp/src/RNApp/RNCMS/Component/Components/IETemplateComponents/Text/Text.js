import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/Text/IComponent'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/Text/Setting'
import Data from 'BaseCMSManage/Components/IETemplateComponents/Text/Data'

import {Text, View, StyleSheet} from 'react-native'

class IEText extends IComponent {
    constructor(props) {
        super(props);
    }
    
    render() {
        let setting = new Setting(this.getSetting("Setting"));
        let data  = new Data(this.props.componentData);

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

        return (
            <View style={styles.view}>
                <Text style={StyleSheet.compose(styles.text, style)}>{data.text}</Text>
                <Text style={StyleSheet.compose(styles.textSmall, smallStyle)}>{data.smallText}</Text>
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
        fontWeight: '600'
    },
    textSmall: {
        marginLeft: 10
    }
});

export default (register) => register(IComponent, IEText);
