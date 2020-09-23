import React from 'react'
import { DefaultSettingName, IEFontSetting } from 'BaseCMSManage/Models/Pages/PageComponentSettingModel'
import Setting from './FontComponentSettingConfig/Setting'

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
    baseStyle = { width: '100%',}

    getSetting(name){
        return this.props.pageComponent.getOrCreatePageComponentSetting(name);
    }

    getDefaultSetting(){
        return this.props.pageComponent.getOrCreatePageComponentSetting(DefaultSettingName);
    }

    // 如要使用字体配置，请添加 FontComponentSettingConfig 到你的组件
    getFontSetting(){
        return new Setting(this.props.pageComponent.getOrCreatePageComponentSetting(IEFontSetting));
    }
}