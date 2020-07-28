import React from 'react';
import {BaseStaticComponent} from '../../BaseComponents/BaseStaticComponent';

import { Typography } from 'antd';
import Setting from './Setting'

const { Title } = Typography;

export default class IEPostTitle extends BaseStaticComponent {
    constructor(props){
        super(props);
    }

    render() {
        let setting = new Setting(this.getSetting("DefaultSetting"));

        let title = this.props.pageData.title || "文章标题";

        if (setting.textType == "h1") {
            return (<Title level={1} style={{ color: setting.fontColor }} >{title}</Title>)
        }
        if (setting.textType == "h2") {
            return (<Title level={2} style={{ color: setting.fontColor }} >{title}</Title>)
        }
        if (setting.textType == "h3") {
            return (<Title level={3} style={{ color: setting.fontColor }} >{title}</Title>)
        }
        if (setting.textType == "h4") {
            return (<Title level={4} style={{ color: setting.fontColor }} >{title}</Title>)
        }

        return (<p style={{ color: setting.fontColor }}>{title}</p>);
    }
}