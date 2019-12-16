import BaseComponentObject, {BaseField, BaseComponent, BaseComponentProps, BasePreview, ComponentSettingConfig } from '../BaseLeafComponent';
import BaseStaticComponent, {BaseStaticComponentProps} from './BaseStaticComponent'

export default class StaticComponentObject extends BaseComponentObject {
    Component(props){
        props instanceof BaseMenuComponentProps;

        throw new Error("Component function undefined");
    }
} 

export {BaseField, BaseStaticComponent, BaseStaticComponentProps, BasePreview, ComponentSettingConfig }