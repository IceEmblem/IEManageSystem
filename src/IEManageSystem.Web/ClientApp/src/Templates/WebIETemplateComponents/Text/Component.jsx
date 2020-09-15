import React from 'react'
import { Typography } from 'antd';
import IComponent from 'IETemplateComponents/Text/IComponent'

const { Title } = Typography;

const titleToLevel = {
    "h1": 1,
    "h2": 2,
    "h3": 3,
    "h4": 4,
};

class Component extends IComponent {
    render() {
        let setting = this.getCurrentSetting();
        let data = this.getCurrentData();

        let text = this.getText();

        let component = titleToLevel[setting.textType] ?
            <Title className="mb-0"
                level={titleToLevel[setting.textType]}
                style={{ color: setting.fontColor }}
            >
                {text}
                <small>{data.smallText}</small>
            </Title> :
            <p className="mb-0" style={{ color: setting.fontColor }}>{text} <small>{data.smallText}</small></p>

        return <div className='d-flex align-items-center' style={{justifyContent: setting.align}}>
            <div>
                {this.props.children}
            </div>
            {component}
        </div>
    }
}

export default Component;
