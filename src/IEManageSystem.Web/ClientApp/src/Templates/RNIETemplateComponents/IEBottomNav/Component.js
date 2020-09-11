import React from "react";
import { StyleSheet, Text, View } from 'react-native'
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import StyleCheck from 'RNCMS/StyleCheck'
import Setting from 'IETemplateComponents/IEBottomNav/Setting'

class Component extends IComponent {
    render() {
        let setting = new Setting(this.getSetting("Setting"));

        let style = StyleCheck.handle({ color: setting.color });

        return (
            <View style={styles.iebottomnav}>
                <Text style={[styles.text, styles.copyright, style]}>
                    {setting.copyright}
                </Text>
                <Text style={[styles.text, style]}>
                    {setting.text}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    iebottomnav: {
        width: "100%",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
    },
    copyright: {
        marginBottom: 10
    },
});

export default Component;