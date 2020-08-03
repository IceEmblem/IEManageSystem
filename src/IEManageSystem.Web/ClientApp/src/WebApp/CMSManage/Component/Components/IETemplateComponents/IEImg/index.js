import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseContentLeafComponent';
import IEImg from './IEImg';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

import DataConfig from './DataConfig'

class ComponentObject extends BaseComponentObject{
    ComponentDataConfig = DataConfig;
    
    Component=IEImg;
    Preview=<p>IE-图片</p>;
}

let componentDescribe = new ComponentDescribe("IEImg", new ComponentObject(), componentType.other, "IE图片");
export default componentDescribe;