import React from 'react'
import BaseComponentObject, { ComponentDataConfig } from '../BaseContentLeafComponent'
import Progress from './Progress'
import CustomizeField from './CustomizeField'
import ComponentDescribe, {componentType} from '../ComponentDescribe'

const field1 = (props) => <CustomizeField text={"步骤1"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;
const field2 = (props) => <CustomizeField text={"步骤2"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;
const field3 = (props) => <CustomizeField text={"步骤3"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;
const field4 = (props) => <CustomizeField text={"步骤4"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;
const field5 = (props) => <CustomizeField text={"步骤5"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;

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
        return <Progress {...props} />
    }
    Preview() {
        return <p>程序流程</p>;
    }
}

let componentDescribe = new ComponentDescribe("Progress", new ComponentObject(), componentType.other);
export default componentDescribe;