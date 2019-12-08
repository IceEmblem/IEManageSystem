import React from 'react'
import PostList from './PostList'
import BaseComponentObject, {BaseField, BasePreview, ComponentSettingConfig} from '../BasePageLeafComponent';

export default class ComponentObject extends BaseComponentObject {
    Component(props) {
        return <PostList {...props} />
    }
    Preview() {
        return <p>文章列表</p>;
    }
}