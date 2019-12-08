import React from 'react'
import BaseComponentObject, { BaseField, ComponentDataConCfigField, LeafComponent, BasePreview, ComponentSettingConfig } from '../BaseLeafComponent'
import Text from './Text'

export default class ComponentObject extends BaseComponentObject {
    constructor(){
        super();
        this.ComponentDataConfigs = {
            field1: ComponentDataConCfigField("文本")
        }
    }
    Component(props) {
        return <Text {...props} />
    }
    Preview() {
        return <p>文本框</p>;
    }
}