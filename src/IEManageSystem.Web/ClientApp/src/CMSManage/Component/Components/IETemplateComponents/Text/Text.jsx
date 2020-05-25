import React from 'react'
import { BaseContentLeafComponent } from '../../BaseComponents/BaseContentLeafComponent'

import { Skeleton, Typography } from 'antd';

import Setting from './Setting'
import Data from './Data'

const { Title } = Typography;

class Text extends BaseContentLeafComponent {
    constructor(props) {
        super(props);

        this.setting = new Setting(this.getPageComponentSetting());
        this.data = new Data(this.props.componentData);
    }

    getPageComponentSetting() {
        return this.props.pageComponentSettings.find(e => e.name == "Setting");
    }

    render() {
        if (!this.props.componentData) {
            return <Skeleton paragraph={{ rows: 0 }} />;
        }

        this.setting.setSetting(this.getPageComponentSetting());
        this.data.setData(this.props.componentData);

        if (this.setting.textType == "h1") {
            return (<Title level={1} style={{ color: this.setting.fontColor }} >{this.data.text} <small>{this.data.smallText}</small> </Title>)
        }
        if (this.setting.textType == "h2") {
            return (<Title level={2} style={{ color: this.setting.fontColor }} >{this.data.text} <small>{this.data.smallText}</small> </Title>)
        }
        if (this.setting.textType == "h3") {
            return (<Title level={3} style={{ color: this.setting.fontColor }} >{this.data.text} <small>{this.data.smallText}</small> </Title>)
        }
        if (this.setting.textType == "h4") {
            return (<Title level={4} style={{ color: this.setting.fontColor }} >{this.data.text} <small>{this.data.smallText}</small> </Title>)
        }

        return (<p style={{ color: this.setting.fontColor }}>{this.data.text} <small>{this.data.smallText}</small></p>);
    }
}

Text.defaultProps = {
};

export default Text;