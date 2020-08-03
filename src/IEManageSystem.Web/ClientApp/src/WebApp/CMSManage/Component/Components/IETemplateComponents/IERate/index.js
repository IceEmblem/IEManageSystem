import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IERate from './IERate';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component=IERate;
    Preview=<p>IE-文章评分</p>;
}

let componentDescribe = new ComponentDescribe("IERate", new ComponentObject(), componentType.other, "IE文章评分");
export default componentDescribe;