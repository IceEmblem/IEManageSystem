import React from 'react'
import BaseComponentObject, { BaseField, ComponentDataConfigField, BaseContentLeafComponent, BasePreview, ComponentSettingConfig } from '../BaseContentLeafComponent'
import Text from './Text'
import ComponentDescribe, {componentType} from '../ComponentDescribe'

class ComponentObject extends BaseComponentObject {
    constructor(){
        super();
        this.ComponentDataConfigs = {
            field1: ComponentDataConfigField("文本")
        }
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