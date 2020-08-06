import BasePageLeafComponent, { PageLeafComponentProps } from './BasePageLeafComponent'
import BaseComponentObject from '../BaseComponent';
import IocContainer from 'Core/IocContainer';
import IPageLeafSettingConfig from './IPageLeafSettingConfig';

export default class PageLeafComponentObject extends BaseComponentObject {
    PageLeafSettingConfig = IocContainer.getService(IPageLeafSettingConfig);
    getComponentSettingConfigs(){
        return [this.BasicSettingConfig, this.PageLeafSettingConfig, ...this.ComponentSettingConfigs]
    }
}

export { BasePageLeafComponent, PageLeafComponentProps, IPageLeafSettingConfig }