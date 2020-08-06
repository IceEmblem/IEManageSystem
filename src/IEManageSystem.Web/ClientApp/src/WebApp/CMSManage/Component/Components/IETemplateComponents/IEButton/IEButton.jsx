import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEButton/IComponent'
import { Button } from 'antd';
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEButton/Setting'
import IocContainer from 'Core/IocContainer';

class IEButton extends IComponent {
    render() {
        let setting = new Setting(this.getSetting("BtnSetting"));

        return (
        <Button shape={setting.shape} type={setting.btnType} size={setting.size}>
            <a href={setting.url}>
                {setting.text}
            </a>
        </Button>
        );
    }
}

IocContainer.registerSingleIntances(IComponent, IEButton);