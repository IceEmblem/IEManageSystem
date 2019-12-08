import React from 'react'
import BaseComponentObject, { BaseField, LeafComponent, BasePreview, ComponentSettingConfig } from '../BaseLeafComponent'
import RichTextEditor from './RichTextEditor'
import CustomizeField from './CustomizeField'

export default class ComponentObject extends BaseComponentObject {
    constructor(){
        super();
        this.ComponentDataConfigs = {
            field1: CustomizeField
        }
    }
    Component(props) {
        return <RichTextEditor {...props} />
    }
    Preview() {
        return <p>富文本框</p>;
    }
}