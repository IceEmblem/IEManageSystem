import React from 'react';
import "./IEDrawer.css";

import { Drawer, Typography } from 'antd';

const { Title } = Typography;

export default class IEDrawer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ie-drawer" style={{ width: "400px" }}
                onMouseOver={() => this.setState({ visible: true })}
                onMouseOut={() => this.setState({ visible: false })}
            >
                <img style={{ width: "100%" }} src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*BPVATKTgfXwAAAAAAAAAAABkARQnAQ" alt="蚂蚁金服体验技术部招聘啦！"></img>
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
                        <Title className="m-0 text-white" level={4}>蚂蚁金服技术部</Title>
                        <p className="m-0 text-white">Some contents...</p>
                    </div>
                </Drawer>
            </div>
        );
    }
}