import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IEImg from './IEImg';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IEImg {...props} />
    }
    Preview() {
        return <p>IE-图片</p>
    };
}

let componentDescribe = new ComponentDescribe("IEImg", new ComponentObject(), componentType.other);
export default componentDescribe;