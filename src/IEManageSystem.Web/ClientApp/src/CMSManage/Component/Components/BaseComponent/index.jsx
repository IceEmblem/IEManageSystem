import React from 'react';
import BaseComponent, { BaseComponentProps } from './BaseComponent';
import BaseConfig from './BaseConfig';
import BasicSettingConfig from './BasicSettingConfig';
import DefaultSettingConfig from './DefaultSettingConfig';
import ComponentSettingConfig from './ComponentSettingConfig';
import BaseField from './BaseField';
import BaseCustomizeField from './BaseCustomizeField';
import BasePreview from './BasePreview';

// 组件对象
export default class BaseComponentObject {
    constructor() {
        this.ComponentSettingConfigs = [];
        this.BasicSettingConfig = BasicSettingConfig;
    }
    Preview() {
        return <BasePreview />
    };
}

export { 
    BaseConfig, 
    BasicSettingConfig, 
    DefaultSettingConfig, 
    ComponentSettingConfig,
    BaseField, 
    BaseCustomizeField, 
    BaseComponent, 
    BaseComponentProps, 
}