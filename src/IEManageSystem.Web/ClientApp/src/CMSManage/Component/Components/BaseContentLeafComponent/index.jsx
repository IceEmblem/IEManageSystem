import BaseContentLeafComponent, { BaseContentLeafComponentProps } from './BaseContentLeafComponent'
import BaseComponentObject from '../BaseLeafComponent';
import React from 'react';
import ComponentDataConfig from './ComponentDataConfig';

// const ComponentDataConfigField =
//     (name) =>
//         (props) =>
//             <BaseField text={name} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;

const field1 = (props) => <BaseField text={"字段1"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;
const field2 = (props) => <BaseField text={"字段2"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;
const field3 = (props) => <BaseField text={"字段3"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;
const field4 = (props) => <BaseField text={"字段4"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;
const field5 = (props) => <BaseField text={"字段5"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;

export default class ContentLeafComponentObject extends BaseComponentObject {
    constructor() {
        super();

        this.ComponentDataConfig = (props) => (
            <ComponentDataConfig {...props}
                field1={field1}
                field2={field2}
                field3={field3}
                field4={field4}
                field5={field5}
            />);
    }
    Component(props) {
        props instanceof BaseContentLeafComponentProps;

        throw new Error("Component function undefined");
    }
}

export { BaseContentLeafComponent, BaseContentLeafComponentProps, ComponentDataConfig }