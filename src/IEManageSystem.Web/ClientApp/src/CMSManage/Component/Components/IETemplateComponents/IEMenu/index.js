import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseMenuComponent';
import IEMenu from './IEMenu';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IEMenu {...props} />
    }
    Preview() {
        return <p>IE-菜单</p>
    };
}

let componentDescribe = new ComponentDescribe("IEMenu", new ComponentObject(), componentType.other);
export default componentDescribe;