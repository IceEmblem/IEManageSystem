import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IECalendar from './IECalendar';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IECalendar {...props} />
    }
    Preview() {
        return <p>IE-日历</p>
    };
}

let componentDescribe = new ComponentDescribe("IECalendar", new ComponentObject(), componentType.other);
export default componentDescribe;