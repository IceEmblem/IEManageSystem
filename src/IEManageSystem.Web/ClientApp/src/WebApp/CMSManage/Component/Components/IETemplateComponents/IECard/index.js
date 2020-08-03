import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseContentLeafComponent';
import IECard from './IECard';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

import DataConfig from './DataConfig'

class ComponentObject extends BaseComponentObject{
    ComponentDataConfig = DataConfig;
    Component=IECard;
    Preview=<p>IE-卡片</p>
}

let componentDescribe = new ComponentDescribe("IECard", new ComponentObject(), componentType.other, "IE卡片");
export default componentDescribe;