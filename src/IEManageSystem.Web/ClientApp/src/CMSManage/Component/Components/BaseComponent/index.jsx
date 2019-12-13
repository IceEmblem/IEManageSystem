import BaseComponent, {BaseComponentProps} from './BaseComponent'
import BasePreview from './BasePreview'
import ComponentSettingConfig from './ComponentSettingConfig' 
import BaseField from './BaseField'
import React from 'react';

// 组件对象
export default class BaseComponentObject{
    constructor(){
        this.ComponentSettingConfigs = [];
    }
    Preview() {
        return <BasePreview />
    };
}

export {BaseField, BaseComponent, BaseComponentProps, BasePreview, ComponentSettingConfig }