import React from 'react'
import BaseComponentObject, { ComponentDataConfig } from '../../BaseComponents/BaseContentLeafComponent'
import RichTextEditor from './RichTextEditor'
import CustomizeField from './CustomizeField'
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject {
    constructor(){
        super();
        this.ComponentDataConfig = (props) => (
            <ComponentDataConfig {...props}
                field1={CustomizeField}
            />);
    }
    Component(props) {
        return <RichTextEditor {...props} />
    }
    Preview() {
        return <p>富文本框</p>;
    }
}

let componentDescribe = new ComponentDescribe("RichTextEditor", new ComponentObject(), componentType.text, "富文本框");
export default componentDescribe;