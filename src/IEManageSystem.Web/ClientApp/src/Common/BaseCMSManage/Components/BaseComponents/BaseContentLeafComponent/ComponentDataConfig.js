import React from 'react'
import IEditConfig from '../BaseComponent/IEditConfig'
import IocContainer from 'Core/IocContainer'
import ComponentContainer from './ComponentContainer'

export class IComponentDataConfigBtnComponent extends React.Component { }
IComponentDataConfigBtnComponent.iocKey = Symbol()

export default class ComponentDataConfig extends IEditConfig {
    ConfigComponent = undefined;
    ComponentContainer = ComponentContainer;

    constructor(ConfigComponent) {
        super();
        this.ConfigComponent = ConfigComponent;
    }

    bulidConfigBtnComponent(sign, currentPageAndPost) {
        if(!this.ConfigComponent){
            return undefined
        }

        let Component = IocContainer.getService(IComponentDataConfigBtnComponent);

        return <Component
            sign={sign}
            currentPageAndPost={currentPageAndPost}
            ConfigComponent={this.ConfigComponent}
        />
    }
}