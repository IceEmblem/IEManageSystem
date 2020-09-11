import React from 'react';
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import "./IEDrawer.css";
import Data from 'IETemplateComponents/IEDrawer/Data'
import Setting from 'IETemplateComponents/IEDrawer/Setting'
import { Drawer, Typography } from 'antd';

const { Title } = Typography;

class Component extends IComponent {
    state={
        visible: false
    }

    constructor(props) {
        super(props);

        this.data = new Data(this.props.componentData);
    }

    render() {
        this.data.setData(this.props.componentData);
        let setting = new Setting(this.getSetting("DefaultSetting"));

        return (
            <div className="ie-drawer"
                onMouseOver={() => this.setState({ visible: true })}
                onMouseOut={() => this.setState({ visible: false })}
            >
                <img style={{ width: "100%" }} height={setting.imgHeight} src={this.data.imgUrl} alt={this.data.title} ></img>
                <Drawer
                    placement="bottom"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    getContainer={false}
                    mask={false}
                    style={{ position: 'absolute' }}
                    height={setting.boxWidth}
                    bodyStyle={{ padding: "10px 24px", textAlign: "left" }}
                >
                    <div>
                        <Title className="m-0 text-white" level={4}>{this.data.title}</Title>
                        <p className="m-0 text-white">{this.data.content}</p>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default Component;
