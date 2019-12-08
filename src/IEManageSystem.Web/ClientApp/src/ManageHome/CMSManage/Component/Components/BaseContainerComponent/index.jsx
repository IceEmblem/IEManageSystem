import BaseContainerComponent from './BaseContainerComponent';
import BaseComponentObject, { BasePreview, ComponentSettingConfig, BaseComponentProps} from '../BaseComponent';
import { ReactNode } from 'react';

export default class ContainerComponentObject extends BaseComponentObject {
    Component(props, childrens){
        props instanceof BaseComponentProps;
        childrens instanceof ReactNode;

        throw new Error("Component function undefined");
    }
} 

export {BaseContainerComponent, BasePreview, ComponentSettingConfig, BaseComponentProps}
