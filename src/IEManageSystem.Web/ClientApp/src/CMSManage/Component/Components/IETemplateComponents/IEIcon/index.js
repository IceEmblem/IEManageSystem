import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IEIcon from './IEIcon';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IEIcon {...props} />
    }
    Preview() {
        return <p>IE-图标</p>
    };
}

let componentDescribe = new ComponentDescribe("IEIcon", new ComponentObject(), componentType.other);
export default componentDescribe;