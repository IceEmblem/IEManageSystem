import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IELink/IComponent'
import Icon from 'react-native-vector-icons/AntDesign'
import { Link, withRouter } from 'react-router-native'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import { Button, Text } from 'native-base'

import Setting from 'BaseCMSManage/Components/IETemplateComponents/IELink/Setting'

class IELink extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let setting = new Setting(this.getSetting("Setting"));

        let fontsize = new Number(setting.fontSize).valueOf();
        if (isNaN(fontsize) || fontsize == 0) {
            fontsize = 14;
        }

        let icon = undefined;
        if (!setting.icon || setting.icon == "") { }
        else if ("GithubOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='github' />;
        else if ("AccountBookFilled" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='account-book' />;
        else if ("CaretDownOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='caret-down' />;
        else if ("CaretLeftFilled" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='caret-left' />;
        else if ("CaretRightFilled" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='caret-right' />;
        else if ("CaretUpFilled" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='caret-up' />;
        else if ("HighlightTwoTone" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='highlight' />;
        else if ("HomeFilled" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='home' />;
        else if ("IdcardOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='idcard' />;
        else if ("RollbackOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='rollback' />;
        else if ("SafetyCertificateFilled" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='safety-certificate' />;
        else if ("StarTwoTone" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='star' />;
        else if ("StepBackwardFilled" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='step-backward' />;
        else if ("StepBackwardOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='step-backward' />;
        else if ("StepForwardFilled" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='step-forward' />;
        else if ("StepForwardOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='step-forward' />;
        else if ("StockOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='stock' />;
        else if ("StopOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='stop' />;
        else if ("UploadOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='upload' />;
        else if ("UsbFilled" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='usb' />;
        else if ("UserAddOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='user-add' />;
        else if ("UserDeleteOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='user-delete' />;
        else if ("UsergroupAddOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='usergroup-add' />;
        else if ("UsergroupDeleteOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='usergroup-delete' />;
        else if ("UserOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='user' />;
        else if ("WeiboSquareFilled" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='weibo-square' />;
        else if ("WifiOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='wifi' />;
        else if ("WindowsFilled" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='windows' />;
        else if ("WomanOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='woman' />;
        else if ("ZhihuOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='zhihu' />;
        else if ("ZoomInOutlined" == setting.icon) icon = <Icon size={fontsize} color={setting.fontColor} name='zoom-in' />;

        return (
            <TouchableHighlight style={[this.baseStyle, styles.btn]}
                onPress={() => {
                    this.props.history.push(setting.url);
                }}
                underlayColor='#0004'
            >
                <View style={styles.view}>
                    {icon}
                    <Text style={{ marginLeft: 5, fontSize: fontsize, color: setting.fontColor }}>{setting.text}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    view:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default (register) => register(IComponent, withRouter(IELink));
