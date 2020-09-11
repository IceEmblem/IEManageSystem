import React from 'react'
import IEditConfig from '../BaseComponent/IEditConfig'
import IocContainer from 'Core/IocContainer'
import ComponentContainer from './ComponentContainer'

export class IContainerConfigBtnComponent extends React.Component { }
IContainerConfigBtnComponent.iocKey = Symbol()

export default class ContainerConfig extends IEditConfig {
    ComponentContainer = undefined;

    itemNum = undefined;

    // { name: string, displayName: string }
    configs = undefined;

    constructor(configs = 0) {
        super()

        if(configs == undefined || configs == null){
            this.itemNum = 0;
        }
        else if(configs instanceof Object){
            this.configs = configs;
        }
        else{
            this.itemNum = configs;
        }

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
            itemNum={this.itemNum}
            containerConfigs={this.configs}
        />
    }
}