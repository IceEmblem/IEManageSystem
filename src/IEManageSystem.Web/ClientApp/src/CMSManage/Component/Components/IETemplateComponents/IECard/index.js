import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseContentLeafComponent';
import IECard from './IECard';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import DataConfig from './DataConfig'

class ComponentObject extends BaseComponentObject{
    ComponentDataConfig = DataConfig;
    
    Component(props){
        return <IECard {...props} />
    }
    Preview() {
        return <p>IE-卡片</p>
    };
}

let componentDescribe = new ComponentDescribe("IECard", new ComponentObject(), componentType.other);
export default componentDescribe;