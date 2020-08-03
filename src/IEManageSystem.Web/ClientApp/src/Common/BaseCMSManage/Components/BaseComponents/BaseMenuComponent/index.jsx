import BaseComponentObject from '../BaseComponent';
import BaseMenuComponent, { BaseMenuComponentProps } from './BaseMenuComponent'
import ReduxComponentContainer from './ComponentContainer'

export default class MenuComponentObject extends BaseComponentObject {
    MenuSettingConfig = undefined;
    getComponentContainer(){
        if(this.ComponentContainerIntance){
            return this.ComponentContainerIntance;
        }

        this.ComponentContainerIntance = ReduxComponentContainer(this.Component);
        return this.ComponentContainerIntance;
    }
    getComponentSettingConfigs(){
        return [this.BasicSettingConfig, this.MenuSettingConfig, ...this.ComponentSettingConfigs]
    }
} 

export {BaseMenuComponent, BaseMenuComponentProps }