import React from 'react'
import IEditConfig from './IEditConfig'
import IocContainer from 'Core/IocContainer'

export class IComponentSettingConfigBtnComponent extends React.Component {}
IComponentSettingConfigBtnComponent.iocKey = Symbol()

export default class BaseComponentSettingConfig extends IEditConfig{
    constructor(name, displayName, ConfigComponent){
        super();
        this.name = name;
        this.displayName = displayName;
        this.ConfigComponent = ConfigComponent;
    }

    bulidConfigBtnComponent(pageId, pageDataId, os, sign){
        let Component = IocContainer.getService(IComponentSettingConfigBtnComponent);

        return <Component
            pageId={pageId}
            pageDataId={pageDataId}
            os={os}
            sign={sign}
            ConfigComponent={this.ConfigComponent}

            displayName={this.displayName}
        />
    }
}