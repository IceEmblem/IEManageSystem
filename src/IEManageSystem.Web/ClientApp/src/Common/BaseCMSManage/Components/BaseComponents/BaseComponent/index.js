import BaseComponent, { BaseComponentProps } from './BaseComponent';
import BaseConfig from './BaseConfig';
import ComponentSettingConfig from './ComponentSettingConfig';
import ReduxComponentContainer from './ComponentContainer';
import IocContainer from 'Core/IocContainer';
import IBasicSettingConfig from './IBasicSettingConfig'

// 组件对象
export default class BaseComponentObject {
    constructor() {
        this.ComponentSettingConfigs = [];
        this.BasicSettingConfig = IocContainer.getService(IBasicSettingConfig);
        this.Component = undefined;
        this.Preview = undefined;
    }
    ComponentContainerIntance = undefined;
    getComponentContainer(){
        if(this.ComponentContainerIntance){
            return this.ComponentContainerIntance;
        }

        if(!this.Component){
            return undefined;
        }

        this.ComponentContainerIntance = ReduxComponentContainer(this.Component);
        return this.ComponentContainerIntance;
    }
    getComponentSettingConfigs(){
        return [this.BasicSettingConfig, ...this.ComponentSettingConfigs]
    }
}

export { 
    BaseConfig, 
    ComponentSettingConfig,
    BaseComponent, 
    BaseComponentProps,
    IBasicSettingConfig,
}