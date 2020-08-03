import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IELogo from './IELogo';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component=IELogo;
    Preview=<p>IE-Logo</p>;
}

let componentDescribe = new ComponentDescribe("IELogo", new ComponentObject(), componentType.other, "IE链接");
export default componentDescribe;