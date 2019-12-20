import BaseComponentObject from '../BaseLeafComponent';
import BaseMenuComponent, { BaseMenuComponentProps } from './BaseMenuComponent'

export default class MenuComponentObject extends BaseComponentObject {
    Component(props){
        props instanceof BaseMenuComponentProps;

        throw new Error("Component function undefined");
    }
} 

export {BaseMenuComponent, BaseMenuComponentProps }