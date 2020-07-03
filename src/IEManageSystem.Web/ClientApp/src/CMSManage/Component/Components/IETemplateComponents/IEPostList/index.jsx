import React from 'react';
import BaseComponentObject from '../../BaseComponents/BasePageLeafComponent';

import IEPostList from './IEPostList';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IEPostList {...props} />
    }
    Preview() {
        return <p>IE-文章列表</p>
    };
}

let componentDescribe = new ComponentDescribe("IEPostList", new ComponentObject(), componentType.page, "IE文章列表");
export default componentDescribe;