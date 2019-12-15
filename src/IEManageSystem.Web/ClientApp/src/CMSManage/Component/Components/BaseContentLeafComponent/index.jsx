import BaseContentLeafComponent, { BaseContentLeafComponentProps } from './BaseContentLeafComponent'
import BaseComponentObject, {BaseField, BaseComponent, BaseComponentProps, BasePreview, ComponentSettingConfig } from '../BaseLeafComponent';
import React from 'react';

const ComponentDataConfigField = 
    (name) => 
    (props) => 
    <BaseField text={name} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;

export default class ContentLeafComponentObject extends BaseComponentObject {
    constructor(){
        super();

        this.ComponentDataConfigs = {
            field1: ComponentDataConfigField("字段1"),
            field2: ComponentDataConfigField("字段2"),
            field3: ComponentDataConfigField("字段3"),
            field4: ComponentDataConfigField("字段4"),
            field5: ComponentDataConfigField("字段5")
        }
    }
    Component(props){
        props instanceof BaseContentLeafComponentProps;

        throw new Error("Component function undefined");
    }
}

export { BaseField, BaseContentLeafComponent, BaseContentLeafComponentProps, BasePreview, ComponentSettingConfig, ComponentDataConfigField }