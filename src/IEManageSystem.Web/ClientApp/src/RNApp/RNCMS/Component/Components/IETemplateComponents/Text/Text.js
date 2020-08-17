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
        let smallStyle = { color: setting.fontColor, marginLeft: '10px' }

        if (setting.textType == "h1") {
            style.fontSize = '27px';
            style.fontWeight = '600'

            smallStyle.fontSize = '19px';
        }
        else if (setting.textType == "h2") {
            style.fontSize = '24px';
            style.fontWeight = '600';

            smallStyle.fontSize = '17px';
        }
        else if (setting.textType == "h3") {
            style.fontSize = '21px';
            style.fontWeight = '600'

            smallStyle.fontSize = '14px';
        }
        else if (setting.textType == "h4") {
            style.fontSize = '18px';
            style.fontWeight = '600'

            smallStyle.fontSize = '11px';
        }
        else {
            smallStyle.fontSize = '8px';
        }

        return (
            <View style={styles.view}>
                <Text style={style}>{data.text}</Text>
                <Text style={smallStyle}>{data.smallText}</Text>
            </View>
        )

        return 
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default (register) => register(IComponent, IEText);
