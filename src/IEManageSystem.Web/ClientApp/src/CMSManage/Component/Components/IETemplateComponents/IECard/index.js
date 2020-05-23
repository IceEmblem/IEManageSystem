import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IECard from './IECard';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IECard {...props} />
    }
    Preview() {
        return <p>IE-卡片</p>
    };
}

let componentDescribe = new ComponentDescribe("IECard", new ComponentObject(), componentType.other);
export default componentDescribe;