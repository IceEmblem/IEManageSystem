import React from 'react'
import BaseComponentObject, { BaseField, LeafComponent, BasePreview, ComponentSettingConfig } from '../BaseLeafComponent'
import Clock from './Clock.jsx'
import CustomizeField from './CustomizeField'

const CustomizeComponentDataConCfigField = 
    (name) => 
    (props) => 
    <CustomizeField text={name} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;

export default class ComponentObject extends BaseComponentObject {
    constructor(){
        super();
        this.ComponentDataConfigs = {
            field1: CustomizeComponentDataConCfigField("数据1"),
            field2: CustomizeComponentDataConCfigField("数据2"),
            field3: CustomizeComponentDataConCfigField("数据3"),
            field4: CustomizeComponentDataConCfigField("数据4"),
            field5: CustomizeComponentDataConCfigField("数据5")
        }
    }
    Component(props) {
        return <Clock {...props} />
    }
    Preview() {
        return <p>日常作息可视图</p>;
    }
}