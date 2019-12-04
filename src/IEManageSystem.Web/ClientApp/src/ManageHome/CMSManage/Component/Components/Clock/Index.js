import React from 'react'
import BaseComponentObject, { BaseField, LeafComponent, BasePreview, ComponentSettingConfig } from '../BaseLeafComponent'
import Clock from './Clock.jsx'
import CustomizeField from './CustomizeField'

const ComponentObject = {
    ...BaseComponentObject,
    ... {
        Component: Clock,
        Preview: (props) => (<p>日常作息可视图</p>),
        ComponentSettingConfigs: BaseComponentObject.ComponentSettingConfigs,
        ComponentDataConfigs: {
            field1: (props) => <CustomizeField text={"数据1"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field2: (props) => <CustomizeField text={"数据2"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field3: (props) => <CustomizeField text={"数据3"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field4: (props) => <CustomizeField text={"数据4"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field5: (props) => <CustomizeField text={"数据5"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />
        }
    }
}

export default ComponentObject