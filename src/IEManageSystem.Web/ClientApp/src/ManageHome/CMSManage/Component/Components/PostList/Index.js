import React from 'react'
import PostList from './PostList'
import BaseComponentObject, {BaseField, BasePreview, ComponentSettingConfig} from '../BaseComponent/Index';

const ComponentObject = {
    Component: PostList,
    Preview: (props)=><p>文章列表</p>,
    ComponentSettingConfigs: BaseComponentObject.ComponentSettingConfigs
}

export default ComponentObject