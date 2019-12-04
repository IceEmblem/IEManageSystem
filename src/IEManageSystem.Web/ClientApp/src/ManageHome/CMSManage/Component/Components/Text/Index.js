import React from 'react'
import BaseComponentObject, { BaseField, LeafComponent, BasePreview, ComponentSettingConfig } from '../BaseLeafComponent'
import Text from './Text'

const ComponentObject = {
    ...BaseComponentObject,
    ... {
        Component: Text,
        Preview: (props) => (<p>文本框</p>),
        ComponentDataConfigs: {
            field1: (props) => <BaseField text={"文本"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />
        }
    }
}

export default ComponentObject