import React from 'react'
import BaseComponentObject, { LeafComponent, BasePreview, ComponentSettingConfig } from '../BaseContainerComponent'
import Container from './Container'

export default class ComponentObject extends BaseComponentObject {
    Component(props, childrens) {
        return <Container {...props} >{childrens}</Container>
    }
    Preview() {
        return <p>容器组件</p>;
    }
}