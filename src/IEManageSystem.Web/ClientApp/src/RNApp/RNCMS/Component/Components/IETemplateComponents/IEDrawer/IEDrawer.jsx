import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEDrawer/IComponent'
import Data from 'BaseCMSManage/Components/IETemplateComponents/IEDrawer/Data'
import { Drawer, Typography } from 'antd';

const { Title } = Typography;

class IEDrawer extends IComponent {
    state={
        visible: false
    }

    constructor(props) {
        super(props);

        this.data = new Data(this.props.componentData);
    }

    render() {
        this.data.setData(this.props.componentData);

        return (
            <div className="ie-drawer"
                onMouseOver={() => this.setState({ visible: true })}
                onMouseOut={() => this.setState({ visible: false })}
            >
                <img style={{ width: "100%" }} src={this.data.imgUrl} alt={this.data.title} ></img>
                <Drawer
                    placement="bottom"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    getContainer={false}
                    mask={false}
                    style={{ position: 'absolute' }}
                    height="110px"
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

export default (register) => register(IComponent, IEDrawer);
