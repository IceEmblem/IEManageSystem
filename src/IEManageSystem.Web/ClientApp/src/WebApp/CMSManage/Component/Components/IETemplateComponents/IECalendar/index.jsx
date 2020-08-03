import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IECalendar from './IECalendar';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component=IECalendar;
    Preview=<p>IE-日历</p>;
}

let componentDescribe = new ComponentDescribe("IECalendar", new ComponentObject(), componentType.other);
export default componentDescribe;