import React from 'react'
import PostList from './PostList'
import BaseComponentObject, {BaseField, BasePreview, ComponentSettingConfig} from '../BasePageLeafComponent';
import ComponentDescribe, {componentType} from '../ComponentDescribe'

class ComponentObject extends BaseComponentObject {
    Component(props) {
        return <PostList {...props} />
    }
    Preview() {
        return <p>文章列表</p>;
    }
}

let componentDescribe = new ComponentDescribe("PostList", new ComponentObject(), componentType.page);
export default componentDescribe;