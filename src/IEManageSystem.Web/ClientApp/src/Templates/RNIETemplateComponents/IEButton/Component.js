import React from 'react';
import IComponent from 'IETemplateComponents/IEButton/IComponent'
import { StyleSheet } from 'react-native'
import { withRouter } from 'react-router-native'
import { Button, Text } from 'native-base'
import StyleCheck from 'RNCMS/StyleCheck'

class Component extends IComponent {
    render() {
        let setting = this.getCurrentSetting();

        return (
            <Button
                style={[this.baseStyle, styles.btn, StyleCheck.handle({backgroundColor: setting.bgcolor, height: setting.btnHeight})]}

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
                <Text style={[StyleCheck.handle({color: setting.color, fontSize: setting.fontSize})]}>{this.props.interactivText || setting.text}</Text>
            </Button>
        );

    }
}

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
})

export default withRouter(Component);