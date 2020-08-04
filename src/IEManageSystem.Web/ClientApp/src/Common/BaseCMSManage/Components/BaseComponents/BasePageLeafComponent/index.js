import React from 'react'
import BasePageLeafComponent, { PageLeafComponentProps } from './BasePageLeafComponent'
import BaseComponentObject from '../BaseComponent';

export default class PageLeafComponentObject extends BaseComponentObject {
    PageLeafSettingConfig = undefined;
    getComponentSettingConfigs(){
        return [this.BasicSettingConfig, this.PageLeafSettingConfig, ...this.ComponentSettingConfigs]
    }
}

export { BasePageLeafComponent, PageLeafComponentProps }