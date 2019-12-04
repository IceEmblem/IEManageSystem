import React from 'react'
import BaseComponentObject, { BaseField, LeafComponent, BasePreview, ComponentSettingConfig } from '../BaseLeafComponent'
import RichTextEditor from './RichTextEditor'
import CustomizeField from './CustomizeField'

const ComponentObject = {
    ...BaseComponentObject,
    ... {
        Component: RichTextEditor,
        Preview: (props) => (<p>富文本框</p>),
        ComponentDataConfigs: {
            field1: CustomizeField
        }
    }
}

export default ComponentObject