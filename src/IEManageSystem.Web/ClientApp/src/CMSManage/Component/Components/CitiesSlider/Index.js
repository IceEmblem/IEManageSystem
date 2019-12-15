import React from 'react'
import BaseComponentObject, { BaseField, ComponentDataConfigField } from '../BaseContentLeafComponent'
import CitiesSlider from './CitiesSlider.jsx'
import ComponentDescribe, {componentType} from '../ComponentDescribe'

class ComponentObject extends BaseComponentObject {
    constructor(){
        super();
        this.ComponentDataConfigs = {
            field1: ComponentDataConfigField("幻灯片1"),
            field2: ComponentDataConfigField("幻灯片2"),
            field3: ComponentDataConfigField("幻灯片3"),
            field4: ComponentDataConfigField("幻灯片4"),
            field5: ComponentDataConfigField("幻灯片5")
        }
    }
    Component(props) {
        return <CitiesSlider {...props} />
    }
    Preview() {
        return <p>幻灯片</p>;
    }
}

let componentDescribe = new ComponentDescribe("CitiesSlider", new ComponentObject(), componentType.other);
export default componentDescribe;