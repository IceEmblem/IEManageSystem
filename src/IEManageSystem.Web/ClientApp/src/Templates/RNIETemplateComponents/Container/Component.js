import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import IComponent from 'IETemplateComponents/Container/IComponent'
import StyleCheck from 'RNCMS/StyleCheck'

class Component extends IComponent {
    render() {
        let setting = this.getCurrentSetting();

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
                    },
                    styles.view,
                    StyleCheck.handle(this.getCommonStyleSetting().toStyle())
                ]}
            >
                {this.props.children}
            </View>);
    }
}

const styles = StyleSheet.create({
    view: {
        height: '100%'
    }
});

export default Component;