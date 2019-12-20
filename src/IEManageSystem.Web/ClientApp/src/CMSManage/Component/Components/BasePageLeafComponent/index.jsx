import BasePageLeafComponent, { PageLeafComponentProps } from './BasePageLeafComponent'
import BaseComponentObject from '../BaseComponent';
import PageLeafSettingConfig from './PageLeafSettingConfig';

export default class PageLeafComponentObject extends BaseComponentObject {
    constructor(){
        super();

        this.PageLeafSettingConfig = PageLeafSettingConfig;
    }

    Component(props){
        props instanceof PageLeafComponentProps;

        throw new Error("Component function undefined");
    }
}

export { BasePageLeafComponent, PageLeafComponentProps }