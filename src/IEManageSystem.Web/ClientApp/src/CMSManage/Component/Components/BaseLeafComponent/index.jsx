import BaseComponentObject from '../BaseComponent';

export default class LeafComponentObject extends BaseComponentObject {
    Component(props){
        props instanceof BaseComponentProps;

        throw new Error("Component function undefined");
    }
}