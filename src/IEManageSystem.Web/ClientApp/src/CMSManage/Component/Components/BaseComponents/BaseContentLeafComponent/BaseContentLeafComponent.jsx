import { BaseComponent, BaseComponentProps } from '../BaseComponent'
import ContentComponentDataModel from 'CMSManage/Models/PageDatas/ContentComponentDataModel'

export class BaseContentLeafComponentProps extends BaseComponentProps{
    constructor(){
        super();
        this.componentData = {};
    }
}

export default class BaseContentLeafComponent extends BaseComponent
{
}