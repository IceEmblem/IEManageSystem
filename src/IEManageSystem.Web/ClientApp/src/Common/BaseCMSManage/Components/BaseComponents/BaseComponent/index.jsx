import BaseComponent, { BaseComponentProps } from './BaseComponent';
import BaseConfig from './BaseConfig';
import ComponentSettingConfig from './ComponentSettingConfig';
import ReduxComponentContainer from './ComponentContainer'

// 组件对象
export default class BaseComponentObject {
    constructor() {
        this.ComponentSettingConfigs = [];
        this.BasicSettingConfig = undefined;
        this.Component = undefined;
        this.Preview = undefined;
    }
    ComponentContainerIntance = undefined;
    getComponentContainer(){
        if(this.ComponentContainerIntance){
            return this.ComponentContainerIntance;
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
}