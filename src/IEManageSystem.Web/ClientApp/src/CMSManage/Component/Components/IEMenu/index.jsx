import React from 'react'
import BaseComponentObject, {BaseField, BaseMenuComponent, BaseMenuComponentProps, BasePreview, ComponentSettingConfig } from '../BaseMenuComponent'
import IEMenu from './IEMenu'
import ComponentDescribe, {componentType} from '../ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    Component(props) {
        return <IEMenu {...props} />
    }
    Preview(){
        return <p>IE菜单</p>;
    }
}

const componentDescribe = new ComponentDescribe("IEMenu", new ComponentObject(), componentType.menu);
export default componentDescribe;