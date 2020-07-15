import BaseComponentObject from '../BaseLeafComponent';
import BaseStaticComponent, {BaseStaticComponentProps} from './BaseStaticComponent'

export default class StaticComponentObject extends BaseComponentObject {
    Component(props){
        let isInherit = props instanceof BaseStaticComponentProps;

        throw new Error("Component function undefined");
    }
} 

export {BaseStaticComponent, BaseStaticComponentProps}