import React from 'react'
import BaseComponentObject, { BaseField, LeafComponent, BasePreview, ComponentSettingConfig } from '../BaseLeafComponent'
import FlipClock from './FlipClock.jsx'

export default class ComponentObject extends BaseComponentObject {
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