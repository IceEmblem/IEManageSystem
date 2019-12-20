import React from 'react';
import IENav from './IENav'
import BaseComponentObject from '../BaseStaticComponent';
import ComponentDescribe, {componentType} from '../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IENav {...props} />;
    }
    Preview() {
        return <p>IE导航栏</p>
    };
}

const componentDescribe = new ComponentDescribe("IENav", new ComponentObject(), componentType.nav);
export default componentDescribe;