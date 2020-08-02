import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IELogo from './IELogo';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IELogo {...props} />
    }
    Preview() {
        return <p>IE-Logo</p>
    };
}

let componentDescribe = new ComponentDescribe("IELogo", new ComponentObject(), componentType.other, "IE链接");
export default componentDescribe;