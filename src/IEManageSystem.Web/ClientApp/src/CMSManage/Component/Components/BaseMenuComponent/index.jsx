import BaseComponentObject, {BaseField, BaseComponent, BaseComponentProps, BasePreview, ComponentSettingConfig } from '../BaseLeafComponent';
import BaseMenuComponent, { BaseMenuComponentProps } from './BaseMenuComponent'

export default class MenuComponentObject extends BaseComponentObject {
    Component(props){
        props instanceof BaseMenuComponentProps;

        throw new Error("Component function undefined");
    }
} 

export {BaseField, BaseMenuComponent, BaseMenuComponentProps, BasePreview, ComponentSettingConfig }