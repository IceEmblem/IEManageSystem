import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IELink from './IELink';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IELink {...props} />
    }
    Preview() {
        return <p>IE-链接</p>
    };
}

let componentDescribe = new ComponentDescribe("IELink", new ComponentObject(), componentType.other);
export default componentDescribe;