import React from 'react';
import BaseComponentObject, {BaseField, BaseStaticComponent, BaseStaticComponentProps, BasePreview, ComponentSettingConfig } from '../BaseStaticComponent';
import IEBackground from './IEBackground';
import ComponentDescribe, {componentType} from '../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IEBackground {...props} />
    }
    Preview() {
        return <p>IE背景组件</p>
    };
}

let componentDescribe = new ComponentDescribe("IEBackground", new ComponentObject(), componentType.background);
export default componentDescribe;