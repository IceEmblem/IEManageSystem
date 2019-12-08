import React from 'react'
import BaseComponentObject, { BaseField, LeafComponent, BasePreview, ComponentSettingConfig } from '../BaseLeafComponent'
import Progress from './Progress'
import CustomizeField from './CustomizeField'

const CustomizeComponentDataConCfigField = 
    (name) => 
    (props) => 
    <CustomizeField text={name} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;

export default class ComponentObject extends BaseComponentObject {
    constructor(){
        super();
        this.ComponentDataConfigs = {
            field1: CustomizeComponentDataConCfigField("步骤1"),
            field2: CustomizeComponentDataConCfigField("步骤2"),
            field3: CustomizeComponentDataConCfigField("步骤3"),
            field4: CustomizeComponentDataConCfigField("步骤4"),
            field5: CustomizeComponentDataConCfigField("步骤5")
        }
    }
    Component(props) {
        return <Progress {...props} />
    }
    Preview() {
        return <p>程序流程</p>;
    }
}