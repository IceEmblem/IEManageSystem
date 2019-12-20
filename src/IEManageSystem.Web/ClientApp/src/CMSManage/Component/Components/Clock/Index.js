import React from 'react'
import BaseComponentObject, {ComponentDataConfig} from '../BaseContentLeafComponent'
import Clock from './Clock.jsx'
import CustomizeField from './CustomizeField'
import ComponentDescribe, {componentType} from '../ComponentDescribe'

const field1 = (props) => <CustomizeField text={"字段1"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;
const field2 = (props) => <CustomizeField text={"字段2"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;
const field3 = (props) => <CustomizeField text={"字段3"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;
const field4 = (props) => <CustomizeField text={"字段4"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;
const field5 = (props) => <CustomizeField text={"字段5"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;

class ComponentObject extends BaseComponentObject {
    constructor(){
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
        return <Clock {...props} />
    }
    Preview() {
        return <p>日常作息可视图</p>;
    }
}

let componentDescribe = new ComponentDescribe("Clock", new ComponentObject(), componentType.graph);
export default componentDescribe;