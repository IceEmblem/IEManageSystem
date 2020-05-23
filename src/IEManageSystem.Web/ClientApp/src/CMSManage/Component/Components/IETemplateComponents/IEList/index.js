import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IEList from './IEList';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IEList {...props} />
    }
    Preview() {
        return <p>IE-列表</p>
    };
}

let componentDescribe = new ComponentDescribe("IEList", new ComponentObject(), componentType.other);
export default componentDescribe;