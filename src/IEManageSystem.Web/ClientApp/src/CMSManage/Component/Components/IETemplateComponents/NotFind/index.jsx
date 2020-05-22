import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import NotFind from './NotFind';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <NotFind {...props} />
    }
    Preview() {
        return <p>无效组件</p>
    };
}

let componentDescribe = new ComponentDescribe("NotFind", new ComponentObject(), componentType.other);
export default componentDescribe;