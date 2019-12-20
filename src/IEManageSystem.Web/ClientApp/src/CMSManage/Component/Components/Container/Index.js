import React from 'react'
import BaseComponentObject from '../BaseContainerComponent'
import Container from './Container'
import ComponentDescribe, {componentType} from '../ComponentDescribe'

class ComponentObject extends BaseComponentObject {
    Component(props, childrens) {
        return <Container {...props} >{childrens}</Container>
    }
    Preview() {
        return <p>容器组件</p>;
    }
}

let componentDescribe = new ComponentDescribe("Container", new ComponentObject(), componentType.container);
export default componentDescribe;