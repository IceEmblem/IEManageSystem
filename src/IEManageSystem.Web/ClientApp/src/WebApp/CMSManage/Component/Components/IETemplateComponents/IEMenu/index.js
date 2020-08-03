import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseMenuComponent';
import IEMenu from './IEMenu';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component=IEMenu;
    Preview=<p>IE-菜单</p>;
}

let componentDescribe = new ComponentDescribe("IEMenu", new ComponentObject(), componentType.menu, "IE菜单");
export default componentDescribe;