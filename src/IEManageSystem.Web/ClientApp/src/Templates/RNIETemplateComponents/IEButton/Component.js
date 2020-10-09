import React from 'react';
import IComponent from 'IETemplateComponents/IEButton/IComponent'
import { StyleSheet, Text } from 'react-native'
import { withRouter } from 'react-router-native'
import { Button } from 'native-base'
import StyleCheck from 'RNCMS/StyleCheck'
import AntIcons from 'BaseCommon/AntIcons'

class Component extends IComponent {
    render() {
        let setting = this.getCurrentSetting();
        let commonSetting = StyleCheck.handle(this.getCommonStyleSetting().toStyle());

        let text = this.getText() ? <Text style={[styles.text, StyleCheck.handle({ color: setting.color, fontSize: setting.fontSize })]}>{this.getText()}</Text> : undefined;

        let icon;
        if (setting.icon) {
            icon = <Text style={[styles.text, {paddingRight: text && 8}]}>{AntIcons.getIcon(setting.icon, StyleCheck.handle({ color: setting.color, fontSize: setting.fontSize }))}</Text>;
        }
        
        return (
            <Button
                style={[this.baseStyle, styles.btn, StyleCheck.handle({ backgroundColor: setting.bgcolor, height: setting.btnHeight }), commonSetting]}

                // 按钮形状，只有方向和有点圆
                rounded={setting.shape && setting.shape != ''}

                // 按钮类型，
                primary={setting.btnType == "primary"}
                light={setting.btnType == "default"}
                transparent={setting.btnType == 'link'}

                // 按钮大小
                small={setting.size == 'small'}
                large={setting.size == 'large'}

                onPress={this.onClick}
            >
                {icon}
                {text}
            </Button>
        );

    }
}

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
    }
})

export default withRouter(Component);