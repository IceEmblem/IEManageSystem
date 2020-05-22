import React from 'react';
import IEBottomNav from './IEBottomNav'
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IEBottomNav {...props} />;
    }
    Preview() {
        return <p>IE底部导航栏</p>
    };
}

const componentDescribe = new ComponentDescribe("IEBottomNav", new ComponentObject(), componentType.nav);
export default componentDescribe;