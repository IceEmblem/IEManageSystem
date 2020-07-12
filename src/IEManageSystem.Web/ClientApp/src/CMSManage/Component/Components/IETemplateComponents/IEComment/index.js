import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IEComment from './IEComment';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IEComment {...props} />
    }
    Preview() {
        return <p>IE-评论</p>
    };
}

let componentDescribe = new ComponentDescribe("IEComment", new ComponentObject(), componentType.page);
export default componentDescribe;