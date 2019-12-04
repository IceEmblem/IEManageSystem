import React from 'react'
import BaseComponentObject, { BaseField, LeafComponent, BasePreview, ComponentSettingConfig } from '../BaseLeafComponent'
import Donut from './Donut.jsx'
import CustomizeField from './CustomizeField'

const ComponentObject = {
    ...BaseComponentObject,
    ... {
        Component: Donut,
        Preview: (props) => (<p>环图</p>),
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