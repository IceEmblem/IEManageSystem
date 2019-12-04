import React from 'react'
import BaseComponentObject, { LeafComponent, BasePreview, ComponentSettingConfig } from '../BaseContainerComponent'
import Container from './Container'

const ComponentObject = {
    ...BaseComponentObject,
    ... {
        Component: Container,
        Preview: (props) => (<p>容器组件</p>),
        ComponentSettingConfigs: BaseComponentObject.ComponentSettingConfigs
    }
}

export default ComponentObject