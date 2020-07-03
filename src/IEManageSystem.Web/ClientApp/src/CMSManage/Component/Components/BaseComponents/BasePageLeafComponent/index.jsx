import React from 'react'
import BasePageLeafComponent, { PageLeafComponentProps } from './BasePageLeafComponent'
import BaseComponentObject, {ComponentSettingConfig} from '../BaseComponent';
import PageLeafSettingConfig from './PageLeafSettingConfig';

export default class PageLeafComponentObject extends BaseComponentObject {
    constructor(){
        super();

        this.PageLeafSettingConfig = ComponentSettingConfig.BuildPageLeafComponentSettingConfig("iePageLeafSetting", "文章配置", 
            (pageComponentSetting, setPageComponentSetting) => {
                return <PageLeafSettingConfig 
                    data={pageComponentSetting}
                    setData={setPageComponentSetting}
                />;
            }
        );
    }

    Component(props){
        let isInherit = props instanceof PageLeafComponentProps;

        throw new Error("Component function undefined");
    }

    getComponentSettingConfigs(){
        return [this.BasicSettingConfig, this.PageLeafSettingConfig, ...this.ComponentSettingConfigs]
    }
}

export { BasePageLeafComponent, PageLeafComponentProps }