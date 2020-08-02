import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';

import IEPostContent from './IEPostContent';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IEPostContent {...props} />
    }
    Preview() {
        return <p>IE-文章内容</p>
    };
}

let componentDescribe = new ComponentDescribe("IEPostContent", new ComponentObject(), componentType.text, "IE文章内容");
export default componentDescribe;