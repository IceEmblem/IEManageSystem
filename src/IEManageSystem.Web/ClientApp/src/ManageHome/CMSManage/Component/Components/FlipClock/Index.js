import React from 'react'
import BaseComponentObject, { BaseField, LeafComponent, BasePreview, ComponentSettingConfig } from '../BaseLeafComponent'
import FlipClock from './FlipClock.jsx'

const ComponentObject = {
    ...BaseComponentObject,
    ... {
        Component: FlipClock,
        Preview: (props) => (<p>翻页式时钟</p>),
        ComponentSettingConfigs: BaseComponentObject.ComponentSettingConfigs,
        ComponentDataConfigs: {}
    }
}

export default ComponentObject