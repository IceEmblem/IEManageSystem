import React from 'react'
import {View} from 'react-native'
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import Setting from 'IETemplateComponents/Container/Setting'

class Component extends IComponent {
    render() {
        let setting = new Setting(this.getSetting("FlexSetting"));

        return (
            <View
                style={[
                    this.baseStyle,
                    {
                        flexDirection: setting.direction,
                        justifyContent: setting.justifyContent,
                        alignItems: setting.alignItems,
                        alignContent: setting.alignContent,
                        flexWrap: setting.wrap,
                    }
                ]}
            >
                {this.props.children}
            </View>);
    }
}

export default Component;