import React from 'react'
import {BaseField} from '../../BaseComponents/BaseComponent';
import BaseComponentObject, { ComponentDataConfig } from '../../BaseComponents/BaseContentLeafComponent'
import Text from './Text'
import ComponentDescribe, {componentType} from '../../ComponentDescribe';

const field1 = (props) => (<BaseField text={"文本"} {...props} />);

class ComponentObject extends BaseComponentObject {
    constructor(){
        super();
        this.ComponentDataConfig = (props) => (
            <ComponentDataConfig {...props}
                field1={field1}
            />);
    }
    Component(props) {
        return <Text {...props} />
    }
    Preview() {
        return <p>文本框</p>;
    }
}

let componentDescribe = new ComponentDescribe("Text", new ComponentObject(), componentType.text);
export default componentDescribe;