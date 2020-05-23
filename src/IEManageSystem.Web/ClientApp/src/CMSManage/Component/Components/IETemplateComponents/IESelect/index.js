import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IESelect from './IESelect';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IESelect {...props} />
    }
    Preview() {
        return <p>IE-选择框</p>
    };
}

let componentDescribe = new ComponentDescribe("IESelect", new ComponentObject(), componentType.other);
export default componentDescribe;