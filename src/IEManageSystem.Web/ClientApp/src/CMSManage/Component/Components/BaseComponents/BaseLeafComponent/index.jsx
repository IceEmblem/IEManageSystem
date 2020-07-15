import BaseComponentObject, {BaseComponentProps} from '../BaseComponent';

export default class LeafComponentObject extends BaseComponentObject {
    Component(props){
        let isInherit = props instanceof BaseComponentProps;

        throw new Error("Component function undefined");
    }
}