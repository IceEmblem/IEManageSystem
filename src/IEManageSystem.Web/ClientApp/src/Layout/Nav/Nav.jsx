import React from 'react';
import PropsTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './Nav.css';

import DefaultAvatar from 'images/default_avatar.png';

import { ieReduxFetch } from 'Core/IEReduxFetch'
import IEToken from 'Core/IEToken'
import { Link } from 'react-router-dom';

import { Input } from 'antd';
import { Button, Tooltip, Tag, Badge } from 'antd';
import { LogoutOutlined, UserOutlined, MessageOutlined, GithubOutlined, BankOutlined } from '@ant-design/icons';

const { Search } = Input;

class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.state =
        {
            userName: null,              // 用户名称
            headSculpture: ""
        };

        this.getUserName();
        this.logoutClick = this.logoutClick.bind(this);
    }

    // 获取用户名称
    getUserName() {
        let postData = {};

        ieReduxFetch("/api/User/GetUserInfo", postData)
            .then(value => {
                this.setState({ userName: value.user.name, headSculpture: value.user.headSculpture });
            })
    }

    // 退出登录单击
    logoutClick() {
        IEToken.clearToken();

        this.props.history.push("/Account");
    }

    render() {

        return (
            <div className={`d-flex ${this.props.className}`}>
                <span className="mr-3">
                    <Link to="/ManageHome/Index" className="antlayout-nav-iconsize"><BankOutlined /></Link>
                </span>
                <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                />
                <div className="flex-grow-1"></div>
                <span className="">
                    <Tag icon={<UserOutlined />} color="#55acee">
                        你好，{this.state.userName}
                    </Tag>
                    <img className="rounded-circle nav-avatar"
                        src={(this.state.headSculpture == null || this.state.headSculpture == "") ? DefaultAvatar : this.state.headSculpture} alt="Card image" />
                </span>
                <span>
                    <a href="https://github.com/IceEmblem/IEManageSystem" className="antlayout-nav-iconsize mr-2 " ><GithubOutlined /></a>
                </span>
                <Badge count={5}>
                    <a className="antlayout-nav-iconsize" href="javescript:void(0)" ><MessageOutlined /></a>
                </Badge>
                <Tooltip placement="bottomRight" title="退出登录">
                    <Button className="ml-3 mr-2" onClick={this.logoutClick} type="primary" icon={<LogoutOutlined />} />
                </Tooltip>
            </div>
        );
    }
}

Nav.propsTypes = {
}

const NavContain = withRouter(Nav)

export default NavContain;