import React from 'react'
import BaseComponentObject from '../../BaseComponents/BaseContentLeafComponent'
import RichTextEditor from './RichTextEditor'
import CustomizeField from './CustomizeField'
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

class ComponentObject extends BaseComponentObject {
    constructor(){
        super();
        this.ComponentDataConfig = (props) => (
            <CustomizeField 
                fieldValue={props.data.getDefauleData().field1}
                setFieldValue={(value)=>{
                    props.data.getDefauleData().field1 = value;
                    props.setData(props.data);
                }}
            />);
    }
    Component=RichTextEditor;
    Preview=<p>富文本框</p>;
}

let componentDescribe = new ComponentDescribe("RichTextEditor", new ComponentObject(), componentType.text, "富文本框");
export default componentDescribe;