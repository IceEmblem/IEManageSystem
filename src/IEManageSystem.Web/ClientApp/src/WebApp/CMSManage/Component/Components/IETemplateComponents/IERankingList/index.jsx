import React from 'react';
import BaseComponentObject from '../../BaseComponents/BasePageLeafComponent';

import IERankingList from './IERankingList';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component=IERankingList;
    Preview=<p>IE-排行榜</p>;
}

let componentDescribe = new ComponentDescribe("IERankingList", new ComponentObject(), componentType.page, "IE排行榜");
export default componentDescribe;