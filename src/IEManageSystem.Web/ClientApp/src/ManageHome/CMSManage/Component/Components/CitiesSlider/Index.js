import React from 'react'
import BaseComponentObject, { BaseField, ComponentDataConCfigField } from '../BaseLeafComponent'
import CitiesSlider from './CitiesSlider.jsx'

export default class ComponentObject extends BaseComponentObject {
    constructor(){
        super();
        this.ComponentDataConfigs = {
            field1: ComponentDataConCfigField("幻灯片1"),
            field2: ComponentDataConCfigField("幻灯片2"),
            field3: ComponentDataConCfigField("幻灯片3"),
            field4: ComponentDataConCfigField("幻灯片4"),
            field5: ComponentDataConCfigField("幻灯片5")
        }
    }
    Component(props) {
        return <CitiesSlider {...props} />
    }
    Preview() {
        return <p>幻灯片</p>;
    }
}