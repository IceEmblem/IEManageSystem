import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/Container/IComponent'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/Container//Setting'
import IocContainer from 'Core/IocContainer';

import './Container.css'


class Container extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let setting = new Setting(this.getSetting("FlexSetting"));

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: setting.direction,
                    justifyContent: setting.justifyContent,
                    alignItems: setting.alignItems,
                    alignContent: setting.alignContent,
                    flexWrap: setting.wrap
                }}
            >
                {this.props.children}
            </div>);
    }
}

IocContainer.registerSingleIntances(IComponent, Container);