import React from "react";
import { StyleSheet, Text, View } from 'react-native'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEBottomNav/IComponent'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEBottomNav/Setting'

class IEBottomNav extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let setting = new Setting(this.getSetting("Setting"));

        let style = { color: setting.color };

        return (
            <View style={styles.iebottomnav}>
                <Text style={{...style, ...{marginRight: "10px"}}}>
                    {setting.copyright}
                </Text>
                <Text style={style}>
                    {setting.text}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    iebottomnav: {
        width: "100%",
        padding: ".5rem 1rem",
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default (register) => register(IComponent, IEBottomNav);