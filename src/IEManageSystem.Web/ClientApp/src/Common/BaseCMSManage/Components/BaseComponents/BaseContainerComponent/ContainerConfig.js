import React from 'react'
import IEditConfig from '../BaseComponent/IEditConfig'
import IocContainer from 'Core/IocContainer'
import ComponentContainer from './ComponentContainer'

export class IContainerConfigBtnComponent extends React.Component { }
IContainerConfigBtnComponent.iocKey = Symbol()

export default class ContainerConfig extends IEditConfig {
    ComponentContainer = undefined;

    describe = undefined;

    itemNum = undefined;

    // [{ name: string, displayName: string }]
    configs = undefined;

    // 如果 configs 是数值，则这个数值限制组件的子组件数目
    // 如果 configs 是对象，则子组件将以键值的方式传给组件，name 就是哪个键
    // describe 是一个使用简绍，再 configs 是对象时生效
    constructor(configs = 0, describe = undefined) {
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

        this.describe = describe;

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
            describe={this.describe}
        />
    }
}