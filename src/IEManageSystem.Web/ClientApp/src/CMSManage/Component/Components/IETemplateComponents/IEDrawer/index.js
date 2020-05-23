import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IEDrawer from './IEDrawer';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IEDrawer {...props} />
    }
    Preview() {
        return <p>IE-抽屉</p>
    };
}

let componentDescribe = new ComponentDescribe("IEDrawer", new ComponentObject(), componentType.other);
export default componentDescribe;