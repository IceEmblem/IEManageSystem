import React from "react";
import { NavLink } from 'react-router-dom';
import { BaseStaticComponent, BaseStaticComponentProps } from '../../BaseComponents/BaseStaticComponent';

import Logo from 'Logo/Logo.jsx';
import './IENav.css'

export default class IENav extends BaseStaticComponent {
    render() {
        return (
            <div className="ienav">
                <div className="fixed-top">
                    <nav className="navbar navbar-expand-sm navbar-dark">
                        <div className="ienav-logo-top">
                            <Logo />
                        </div>
                        <a className="navbar-brand ienav-sitename" href="#">冰纹IceEmblem</a>
                        <div className="ml-auto d-flex">
                            <div className="padding-right-10">
                                <NavLink to="/Account" className="btn btn-outline-info ienav-loginbth">
                                    <span className="oi oi-account-login padding-right-10" title="icon name" aria-hidden="true"></span>
                                    <span>登录</span>
                                </NavLink>
                            </div>
                            <div className="padding-right-10">
                                <NavLink to="/Account" className="btn btn-outline-info ienav-registerbth">
                                    <span className="oi oi-person padding-right-10" title="icon name" aria-hidden="true"></span>
                                    <span>注册</span>
                                </NavLink>
                            </div>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-info" type="submit">搜索一下</button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

        );
    }
}