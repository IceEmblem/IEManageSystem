import React from 'react'
import BaseComponentObject from '../BaseStaticComponent'
import FlipClock from './FlipClock.jsx'
import ComponentDescribe, {componentType} from '../ComponentDescribe'

class ComponentObject extends BaseComponentObject {
    constructor(){
        super();
    }
    Component(props) {
        return <FlipClock {...props} />
    }
    Preview() {
        return <p>翻页式时钟</p>;
    }
}

let componentDescribe = new ComponentDescribe("FlipClock", new ComponentObject(), componentType.other);
export default componentDescribe;