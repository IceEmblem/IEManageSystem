import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';

import IEPostDescribe from './IEPostDescribe';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IEPostDescribe {...props} />
    }
    Preview() {
        return <p>IE-文章描述</p>
    };
}

let componentDescribe = new ComponentDescribe("IEPostDescribe", new ComponentObject(), componentType.text, "IE文章描述");
export default componentDescribe;