import React from 'react'
import BaseContainerComponent from './BaseContainerComponent';
import BaseComponentObject, { BasePreview, ComponentSettingConfig, BaseComponentProps} from '../BaseComponent';

export default class ContainerComponentObject extends BaseComponentObject {
    Component(props, childrens){
        let isInherit = props instanceof BaseComponentProps;

        throw new Error("Component function undefined");
    }
} 

export {BaseContainerComponent}
