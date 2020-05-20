import React from 'react';
import BaseComponentObject, {ComponentSettingConfig} from '../BaseComponent';
import BaseMenuComponent, { BaseMenuComponentProps } from './BaseMenuComponent'
import MenuSettingConfig from './MenuSettingConfig'

export default class MenuComponentObject extends BaseComponentObject {
    constructor(){
        super();

        this.MenuSettingConfig = ComponentSettingConfig.BuildMenuComponentSettingConfig("ieMenuSetting", "菜单配置", 
            (pageComponentSetting, setPageComponentSetting) => {
                return <MenuSettingConfig 
                    data={pageComponentSetting}
                    setData={setPageComponentSetting}
                />;
            }
        );
    }
    Component(props){
        let isInherit = props instanceof BaseMenuComponentProps;

        throw new Error("Component function undefined");
    }
    getComponentSettingConfigs(){
        return [this.BasicSettingConfig, this.MenuSettingConfig, ...this.ComponentSettingConfigs]
    }
} 

export {BaseMenuComponent, BaseMenuComponentProps }