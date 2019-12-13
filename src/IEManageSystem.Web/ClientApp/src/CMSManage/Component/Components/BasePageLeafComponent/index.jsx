import BasePageLeafComponent, { PageLeafComponentProps } from './BasePageLeafComponent'
import BaseComponentObject, {BaseField, BasePreview, ComponentSettingConfig } from '../BaseComponent';

export default class PageLeafComponentObject extends BaseComponentObject {
    Component(props){
        props instanceof PageLeafComponentProps;

        throw new Error("Component function undefined");
    }
}

export { BaseField, BasePageLeafComponent, BasePreview, ComponentSettingConfig, PageLeafComponentProps }