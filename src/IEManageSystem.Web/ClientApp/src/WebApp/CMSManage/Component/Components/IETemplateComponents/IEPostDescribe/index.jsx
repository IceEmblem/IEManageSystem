import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';

import IEPostDescribe from './IEPostDescribe';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component=IEPostDescribe;
    Preview=<p>IE-文章描述</p>;
}

let componentDescribe = new ComponentDescribe("IEPostDescribe", new ComponentObject(), componentType.text, "IE文章描述");
export default componentDescribe;