import React from 'react'
import IEditConfig from '../BaseComponent/IEditConfig'
import IocContainer from 'Core/IocContainer'
import ComponentContainer from './ComponentContainer'

export class IComponentDataConfigBtnComponent extends React.Component { }

export default class ComponentDataConfig extends IEditConfig {
    ConfigComponent = undefined;
    ComponentContainer = ComponentContainer;

    constructor(ConfigComponent) {
        super();
        this.ConfigComponent = ConfigComponent;
    }

    bulidConfigBtnComponent(pageId, pageDataId, os, sign) {
        if(!this.ConfigComponent){
            return undefined
        }

        let Component = IocContainer.getService(IComponentDataConfigBtnComponent);

        return <Component
            pageId={pageId}
            pageDataId={pageDataId}
            os={os}
            sign={sign}
            ConfigComponent={this.ConfigComponent}
        />
    }
}