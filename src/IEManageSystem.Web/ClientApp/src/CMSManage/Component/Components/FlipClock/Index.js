import React from 'react'
import BaseComponentObject, { BaseField, BaseContentLeafComponent, BasePreview, ComponentSettingConfig } from '../BaseContentLeafComponent'
import FlipClock from './FlipClock.jsx'
import ComponentDescribe, {componentType} from '../ComponentDescribe'

class ComponentObject extends BaseComponentObject {
    constructor(){
        super();
        this.ComponentDataConfigs = {}
    }
    Component(props) {
        return <FlipClock {...props} />
    }
    Preview() {
        return <p>翻页式时钟</p>;
    }
}

let componentDescribe = new ComponentDescribe("FlipClock", new ComponentObject(), componentType.other);
export default componentDescribe;