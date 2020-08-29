import BaseComponent, { BaseComponentProps } from './BaseComponent';
import BaseConfig from './BaseConfig';
import ComponentSettingConfig from './ComponentSettingConfig';
import BasicComponentSettingConfig from './BasicComponentSettingConfig'

// 组件对象
export default class BaseComponentObject {
    constructor() {
        this.ComponentSettingConfigs = [];
        this.ComponentDataConfig = undefined;
        this.BasicComponentSettingConfig = new BasicComponentSettingConfig();
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

        let component = this.Component;
        this.ComponentSettingConfigs.forEach(item => {
            if(item.ComponentContainer){
                component = item.ComponentContainer(component);
            }
        });

        if(this.ComponentDataConfig){
            component = this.ComponentDataConfig.ComponentContainer(component);
        }

        component = this.BasicComponentSettingConfig.ComponentContainer(component);

        this.ComponentContainerIntance = component;
        return this.ComponentContainerIntance;
    }
}

export { 
    BaseConfig, 
    ComponentSettingConfig,
    BaseComponent, 
    BaseComponentProps,
    IBasicSettingConfig,
}