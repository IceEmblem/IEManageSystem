import React from 'react'
import BaseComponentObject, { BaseField, LeafComponent, BasePreview, ComponentSettingConfig } from '../BaseLeafComponent'
import CitiesSlider from './CitiesSlider.jsx'


const ComponentObject = {
    ...BaseComponentObject,
    ... {
        Component: CitiesSlider,
        Preview: (props) => (<p>幻灯片</p>),
        ComponentSettingConfigs: BaseComponentObject.ComponentSettingConfigs,
        ComponentDataConfigs: {
            field1: (props) => <BaseField text={"幻灯片1"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field2: (props) => <BaseField text={"幻灯片2"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field3: (props) => <BaseField text={"幻灯片3"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field4: (props) => <BaseField text={"幻灯片4"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field5: (props) => <BaseField text={"幻灯片5"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />
        }
    }
}

export default ComponentObject