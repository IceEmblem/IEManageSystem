import React from 'react'
import IEditConfig from '../BaseComponent/IEditConfig'
import ComponentContainer from './ContainerComponentContainer'
import ContainerConfig, {IContainerConfigBtnComponent} from '../BaseContainerComponent/ContainerConfig'
import IocContainer from 'Core/IocContainer'

export default class InteractiveContainerConfig extends IEditConfig {
    ComponentContainer = undefined;

    // [{ name: string, displayName: string }]
    configs = undefined;

    constructor(configs) {
        super()

        this.configs = configs;

        this.ComponentContainer = (component) => (props) => {
            return <ComponentContainer 
                _containerComponent={component}
                containerConfigs={this.configs}
                {...props}
            />
        }
    }

    bulidConfigBtnComponent(sign, currentPageAndPost) {
        let Component = IocContainer.getService(IContainerConfigBtnComponent);

        return <Component
            sign={sign}
            currentPageAndPost={currentPageAndPost}
            itemNum={1}
            containerConfigs={this.configs}
        />
    }
}