import React from 'react';

import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import Logo from 'Common/Logo/Logo.jsx';
import SideNav from './SideNav/SideNav.jsx'
import Nav from './Nav/Nav'
import BodyDiv from './BodyDiv/BodyDiv'

import './ManageHome.css'

const { Header, Sider, Content } = Layout;

export default class ManageHome extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout className="antlayout">
                <Sider
                    className="hide-scroll"
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    style={{
                        height: '100vh',
                        left: 0,
                    }}
                >
                    <div className="antlogo" >
                        <div className="d-flex justify-content-center align-content-center align-items-center">
                            <Logo className="h-100 flex-shrink-0 flex-grow-0 logowith" />
                            {!this.state.collapsed &&
                                <div className="text-white ml-1 font-italic flex-shrink-1 flex-grow-1 text-nowrap">冰纹 IceEmblem</div>
                            }
                        </div>
                    </div>
                    <SideNav className="" />
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background d-flex align-items-center" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        <Nav className="flex-grow-1 align-items-center" />
                    </Header>
                    <Content
                        className=""
                        style={{
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <BodyDiv />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}