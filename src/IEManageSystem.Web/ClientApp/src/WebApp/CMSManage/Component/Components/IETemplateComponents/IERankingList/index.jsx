import React from 'react';
import BaseComponentObject from '../../BaseComponents/BasePageLeafComponent';

import IERankingList from './IERankingList';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props){
        return <IERankingList {...props} />
    }
    Preview() {
        return <p>IE-排行榜</p>
    };
}

let componentDescribe = new ComponentDescribe("IERankingList", new ComponentObject(), componentType.page, "IE排行榜");
export default componentDescribe;