import React from 'react'
import BaseComponentObject, { BaseField, LeafComponent, BasePreview, ComponentSettingConfig } from '../BaseLeafComponent'
import Progress from './Progress'
import CustomizeField from './CustomizeField'

const ComponentObject = {
    ...BaseComponentObject,
    ... {
        Component: Progress,
        Preview: (props) => (<p>程序流程</p>),
        ComponentDataConfigs: {
            field1: (props) => <CustomizeField text={"第1步"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field2: (props) => <CustomizeField text={"第2步"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field3: (props) => <CustomizeField text={"第3步"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field4: (props) => <CustomizeField text={"第4步"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field5: (props) => <CustomizeField text={"第5步"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />
        }
    }
}

export default ComponentObject