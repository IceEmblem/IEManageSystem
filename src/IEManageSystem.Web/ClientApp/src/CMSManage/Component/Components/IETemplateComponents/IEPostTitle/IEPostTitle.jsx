import React from 'react';
import {BaseStaticComponent} from '../../BaseComponents/BaseStaticComponent';

import { Typography } from 'antd';
import Setting from './Setting'

const { Title } = Typography;

export default class IEPostTitle extends BaseStaticComponent {
    constructor(props){
        super(props);

        this.setting = new Setting(this.getPageComponentSetting());
    }

    getPageComponentSetting(){
        return this.props.pageComponentSettings.find(e=>e.name == "DefaultSetting");
    }

    render() {
        this.setting.setSetting(this.getPageComponentSetting());

        let title = this.props.pageData.title || "文章标题";

        if (this.setting.textType == "h1") {
            return (<Title level={1} style={{ color: this.setting.fontColor }} >{title}</Title>)
        }
        if (this.setting.textType == "h2") {
            return (<Title level={2} style={{ color: this.setting.fontColor }} >{title}</Title>)
        }
        if (this.setting.textType == "h3") {
            return (<Title level={3} style={{ color: this.setting.fontColor }} >{title}</Title>)
        }
        if (this.setting.textType == "h4") {
            return (<Title level={4} style={{ color: this.setting.fontColor }} >{title}</Title>)
        }

        return (<p style={{ color: this.setting.fontColor }}>{title}</p>);
    }
}