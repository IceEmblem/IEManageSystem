import React from 'react'
import { DefaultSettingName, IEFontSetting, IECommonStyleSetting } from 'BaseCMSManage/Models/Pages/PageComponentSettingModel'
import FontComponentSetting from './FontComponentSettingConfig/Setting'
import CommonStyleSetting from './CommonStyleSettingConfig/Setting'

export class BaseComponentProps{
    constructor(){
        this.pageComponent = null;
        // 执行逻辑 (requestData) => Promise;
        this.execLogic = (requestData)=>{};
        // 刷新页面
        this.pageFreshen = ()=>{};
        // 页面
        this.page = null;
        // 文章
        this.pageData = null;
    }
}

export default class BaseComponent extends React.Component {
    baseStyle = { 
        width: this.props.pageComponent.pageComponentBaseSetting.width ? '100%' : undefined
    }

    constructor(props){
        super(props);
    }

    getSetting(name){
        return this.props.pageComponent.getOrCreatePageComponentSetting(name);
    }

    getDefaultSetting(){
        return this.props.pageComponent.getOrCreatePageComponentSetting(DefaultSettingName);
    }

    // 如要使用字体配置，请添加 FontComponentSettingConfig 到你的组件
    getFontSetting(){
        return new FontComponentSetting(this.props.pageComponent.getOrCreatePageComponentSetting(IEFontSetting));
    }

    // 如要使用通用样式配置，请添加 CommonStyleSettingConfig 到你的组件
    getCommonStyleSetting(){
        return new CommonStyleSetting(this.props.pageComponent.getOrCreatePageComponentSetting(IECommonStyleSetting))
    }
}