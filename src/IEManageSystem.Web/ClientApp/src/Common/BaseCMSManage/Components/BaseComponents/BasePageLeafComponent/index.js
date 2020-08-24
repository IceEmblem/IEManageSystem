import BasePageLeafComponent, { PageLeafComponentProps } from './BasePageLeafComponent'
import BaseComponentObject from '../BaseComponent';
import IocContainer from 'Core/IocContainer';
import IPageLeafSettingConfig from './IPageLeafSettingConfig';
import ReduxComponentContainer from './ComponentContainer'
import {withRouter} from 'react-router'

export default class PageLeafComponentObject extends BaseComponentObject {
    PageLeafSettingConfig = IocContainer.getService(IPageLeafSettingConfig);
    getComponentSettingConfigs(){
        return [this.BasicSettingConfig, this.PageLeafSettingConfig, ...this.ComponentSettingConfigs]
    }
    getComponentContainer(){
        if(this.ComponentContainerIntance){
            return this.ComponentContainerIntance;
        }

        if(!this.Component){
            return undefined;
        }

        this.ComponentContainerIntance = withRouter(ReduxComponentContainer(this.Component));
        return this.ComponentContainerIntance;
    }
}

export { BasePageLeafComponent, PageLeafComponentProps, IPageLeafSettingConfig }