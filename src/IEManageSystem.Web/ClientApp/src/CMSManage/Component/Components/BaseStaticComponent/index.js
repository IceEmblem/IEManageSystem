import BaseComponentObject from '../BaseLeafComponent';
import BaseStaticComponent, {BaseStaticComponentProps} from './BaseStaticComponent'

export default class StaticComponentObject extends BaseComponentObject {
    Component(props){
        props instanceof BaseMenuComponentProps;

        throw new Error("Component function undefined");
    }
} 

export {BaseStaticComponent, BaseStaticComponentProps}