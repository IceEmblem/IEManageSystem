import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';

import IEPostContent from './IEPostContent';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component=IEPostContent;
    Preview=<p>IE-文章内容</p>
}

let componentDescribe = new ComponentDescribe("IEPostContent", new ComponentObject(), componentType.text, "IE文章内容");
export default componentDescribe;