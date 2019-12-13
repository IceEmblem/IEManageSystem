import BaseLeafComponent, { BaseLeafComponentProps } from './BaseLeafComponent'
import BaseComponentObject, {BaseField, BasePreview, ComponentSettingConfig } from '../BaseComponent';
import { ReactNode } from 'react';
import React from 'react';

const ComponentDataConCfigField = 
    (name) => 
    (props) => 
    <BaseField text={name} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;

export default class LeafComponentObject extends BaseComponentObject {
    constructor(){
        super();

        this.ComponentDataConfigs = {
            field1: ComponentDataConCfigField("字段1"),
            field2: ComponentDataConCfigField("字段2"),
            field3: ComponentDataConCfigField("字段3"),
            field4: ComponentDataConCfigField("字段4"),
            field5: ComponentDataConCfigField("字段5")
        }
    }
    Component(props){
        props instanceof BaseLeafComponentProps;

        throw new Error("Component function undefined");
    }
}

export { BaseField, BaseLeafComponent, BasePreview, ComponentSettingConfig, ComponentDataConCfigField, BaseLeafComponentProps }