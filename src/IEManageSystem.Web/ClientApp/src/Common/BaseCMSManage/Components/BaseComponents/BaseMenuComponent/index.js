import BaseComponentObject from '../BaseComponent';
import BaseMenuComponent, { BaseMenuComponentProps } from './BaseMenuComponent';
import ReduxComponentContainer from './ComponentContainer';
import IocContainer from 'Core/IocContainer';
import IMenuSettingConfig from './IMenuSettingConfig';

export default class MenuComponentObject extends BaseComponentObject {
    MenuSettingConfig = IocContainer.getService(IMenuSettingConfig);
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

export {BaseMenuComponent, BaseMenuComponentProps, IMenuSettingConfig }