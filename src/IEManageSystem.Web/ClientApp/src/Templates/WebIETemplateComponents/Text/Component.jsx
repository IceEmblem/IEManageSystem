import React from 'react'
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import { Typography } from 'antd';
import Setting from 'IETemplateComponents/Text/Setting'
import Data from 'IETemplateComponents/Text/Data'

const { Title } = Typography;

class Component extends IComponent {
    constructor(props) {
        super(props);

        this.data = new Data(this.props.componentData);
    }
    
    render() {
        let setting = new Setting(this.getSetting("Setting"));
        this.data.setData(this.props.componentData);

        let text = this.props.interactivText || this.data.text;

        let component;
        if (setting.textType == "h1") {
            component =  (<Title className="mb-0" level={1} style={{ color: setting.fontColor }} >{text} <small>{this.data.smallText}</small> </Title>)
        }
        else if (setting.textType == "h2") {
            component =  (<Title className="mb-0" level={2} style={{ color: setting.fontColor }} >{text} <small>{this.data.smallText}</small> </Title>)
        }
        else if (setting.textType == "h3") {
            component =  (<Title className="mb-0" level={3} style={{ color: setting.fontColor }} >{text} <small>{this.data.smallText}</small> </Title>)
        }
        else if (setting.textType == "h4") {
            component =  (<Title className="mb-0" level={4} style={{ color: setting.fontColor }} >{text} <small>{this.data.smallText}</small> </Title>)
        }
        else{
            component =  (<p className="mb-0" style={{ color: setting.fontColor }}>{text} <small>{this.data.smallText}</small></p>);
        }
        
        return <div className='d-flex align-items-center'>
            <div>
                {this.props.children}
            </div>
            {component}
        </div>
    }
}

export default Component;
