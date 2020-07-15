import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IESearch from './IESearch';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IESearch {...props} />
    }
    Preview() {
        return <p>IE-搜索框</p>
    };
}

let componentDescribe = new ComponentDescribe("IESearch", new ComponentObject(), componentType.other, "IE搜索框");
export default componentDescribe;