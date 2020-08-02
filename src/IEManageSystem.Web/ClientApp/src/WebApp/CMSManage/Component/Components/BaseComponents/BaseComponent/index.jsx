import React from 'react';
import BaseComponent, { BaseComponentProps } from './BaseComponent';
import BaseConfig from './BaseConfig';
import BasicSettingConfig from './BasicSettingConfig';
import DefaultSettingConfig from './DefaultSettingConfig';
import ComponentSettingConfig from './ComponentSettingConfig';
import BaseField from './BaseField';
import BasePreview from './BasePreview';
import ComponentContainer from './ComponentContainer'

// 组件对象
export default class BaseComponentObject {
    constructor() {
        this.ComponentSettingConfigs = [];
        this.BasicSettingConfig = ComponentSettingConfig.BuildBasicComponentSettingConfig("ieBaiscSetting", "基本设置",
            (pageComponentSetting, setPageComponentSetting) => {
                return <BasicSettingConfig 
                    data={pageComponentSetting}
                    setData={setPageComponentSetting}
                />;
            }
        );
        this.ComponentContainer = ComponentContainer(this.Component);
    }
    Preview() {
        return <BasePreview />
    };
    getComponentSettingConfigs(){
        return [this.BasicSettingConfig, ...this.ComponentSettingConfigs]
    }
    Component(props) {
        return undefined;
    };
}

export { 
    BaseConfig, 
    BasicSettingConfig, 
    DefaultSettingConfig, 
    ComponentSettingConfig,
    BaseField, 
    BaseComponent, 
    BaseComponentProps, 
}