import React from 'react';
import {Text} from 'react-native'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEButton/IComponent'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEButton/Setting'
import { Button } from '@ant-design/react-native';
import { Link } from 'react-router-native'

class IEButton extends IComponent {
    render() {
        let setting = new Setting(this.getSetting("BtnSetting"));

        let btnType = undefined;
        if(setting.btnType == "primary"){
            btnType = "primary"
        }
        else if(setting.btnType == "ghost"){
            btnType = "ghost"
        }
        else if(setting.btnType == "warning"){
            btnType = "warning"
        }

        return (
        <Button shape={setting.shape} type={btnType} size={setting.size}>
            <Link to={setting.url} style={{color: "inherit"}}>
                <Text>{setting.text}</Text>
            </Link>
        </Button>
        );
    }
}

export default (register) => register(IComponent, IEButton);