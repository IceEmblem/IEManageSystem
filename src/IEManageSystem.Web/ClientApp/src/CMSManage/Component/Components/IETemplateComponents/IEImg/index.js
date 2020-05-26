import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseContentLeafComponent';
import IEImg from './IEImg';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import DataConfig from './DataConfig'

class ComponentObject extends BaseComponentObject{
    ComponentDataConfig = DataConfig;
    
    Component(props){
        return <IEImg {...props} />
    }
    Preview() {
        return <p>IE-图片</p>
    };
}

let componentDescribe = new ComponentDescribe("IEImg", new ComponentObject(), componentType.other);
export default componentDescribe;