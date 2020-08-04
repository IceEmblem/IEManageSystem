import { BaseComponent, BaseComponentProps } from '../BaseComponent'

export class BaseContentLeafComponentProps extends BaseComponentProps{
    constructor(){
        super();
        this.componentData = {};
    }
}

export default class BaseContentLeafComponent extends BaseComponent
{
}