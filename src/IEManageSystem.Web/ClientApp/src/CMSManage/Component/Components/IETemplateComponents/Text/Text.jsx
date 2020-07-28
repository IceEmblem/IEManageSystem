import React from 'react'
import { BaseContentLeafComponent } from '../../BaseComponents/BaseContentLeafComponent'

import { Skeleton, Typography } from 'antd';

import Setting from './Setting'
import Data from './Data'

const { Title } = Typography;

class Text extends BaseContentLeafComponent {
    constructor(props) {
        super(props);

        this.data = new Data(this.props.componentData);
    }
    
    render() {
        let setting = new Setting(this.getSetting("Setting"));
        this.data.setData(this.props.componentData);

        if (setting.textType == "h1") {
            return (<Title className="mb-0" level={1} style={{ color: setting.fontColor }} >{this.data.text} <small>{this.data.smallText}</small> </Title>)
        }
        if (setting.textType == "h2") {
            return (<Title className="mb-0" level={2} style={{ color: setting.fontColor }} >{this.data.text} <small>{this.data.smallText}</small> </Title>)
        }
        if (setting.textType == "h3") {
            return (<Title className="mb-0" level={3} style={{ color: setting.fontColor }} >{this.data.text} <small>{this.data.smallText}</small> </Title>)
        }
        if (setting.textType == "h4") {
            return (<Title className="mb-0" level={4} style={{ color: setting.fontColor }} >{this.data.text} <small>{this.data.smallText}</small> </Title>)
        }

        return (<p className="mb-0" style={{ color: setting.fontColor }}>{this.data.text} <small>{this.data.smallText}</small></p>);
    }
}

Text.defaultProps = {
};

export default Text;