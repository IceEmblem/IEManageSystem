import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseContentLeafComponent';
import IEDrawer from './IEDrawer';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

import DataConfig from './DataConfig'

class ComponentObject extends BaseComponentObject{
    ComponentDataConfig = DataConfig;
    
    Component=IEDrawer;
    Preview=<p>IE-抽屉</p>
}

let componentDescribe = new ComponentDescribe("IEDrawer", new ComponentObject(), componentType.other, "IE抽屉");
export default componentDescribe;