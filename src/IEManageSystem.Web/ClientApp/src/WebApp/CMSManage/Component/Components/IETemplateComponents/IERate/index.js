import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IERate from './IERate';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IERate {...props} />
    }
    Preview() {
        return <p>IE-文章评分</p>
    };
}

let componentDescribe = new ComponentDescribe("IERate", new ComponentObject(), componentType.other, "IE文章评分");
export default componentDescribe;