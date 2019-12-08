import { BaseComponent, BaseComponentProps } from '../BaseComponent'

export class BaseLeafComponentProps extends BaseComponentProps{
    constructor(){
        super();
        this.componentData = {};
    }
}

export default class BaseLeafComponent extends BaseComponent
{
}