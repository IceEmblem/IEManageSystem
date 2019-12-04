import React from 'react';
import { withRouter } from 'react-router-dom';
import PropsTypes from 'prop-types';

import './Nav.css';
import Logo from 'Logo/Logo.jsx';
import ListBtn from 'ListBtn'

import DefaultAvatar from 'images/default_avatar.png';

import LayoutRedux from 'Layout/IEReduxs/LayoutRedux'

import { topLevelMenusSelect } from 'Layout/IEReduxs/Actions';
import {ieReduxFetch} from 'Core/IEReduxFetch'
import {getIEStore} from 'Core/IEStore'

class Nav extends React.Component {
    // props.topLevelMenus
    // props.selectedTopMenu
    // props.topLevelMenusSelect
    // props.sideNavState
    // props.setSideNavState
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

    componentDidUpdate(){
        if(!this.props.selectedTopMenu && this.props.topLevelMenus && this.props.topLevelMenus.length > 0){
            this.props.topLevelMenusSelect(this.props.topLevelMenus[0]);
        }
    }

    // 获取用户名称
    getUserName() {
        let postData = {};

        ieReduxFetch("/api/User/GetUserInfo", postData)
        .then(value=>{
            this.setState({ userName: value.user.name, headSculpture: value.user.headSculpture });
        })
    }

    // 退出登录单击
    logoutClick() {
        IETool.clearToken();

        this.props.history.push("/Account");
    }

    render() {
        let menuItemLis = new Array();
        for (let item in this.props.topLevelMenus) {
            let className = (this.props.selectedTopMenu||{}).id == this.props.topLevelMenus[item].id ? "nav-link navbar_css_li_click" : "nav-link";

            let menuItemLi =
                <li key={item} className="nav-item">
                    <a href="javascript:void(0)" onClick={() => { this.props.topLevelMenusSelect(this.props.topLevelMenus[item]) }} className={className} to={this.props.topLevelMenus[item].url}>
                        {
                            this.props.topLevelMenus[item].icon !== undefined &&
                            <span className={"oi padding-right-10 " + this.props.topLevelMenus[item].icon} title="icon name" aria-hidden="true"></span>
                        }
                        <span>
                            {this.props.topLevelMenus[item].text}
                        </span>
                    </a>
                </li>;

            menuItemLis.push(menuItemLi);
        }

        return (
            <nav className="navbar navbar-expand-md navbar_css flex-shrink-0 row">
                <div className="navbar-site-title">
                    <div className="float-left navbar_logo_css">
                        <Logo />
                    </div>
                    <a className="navbar-brand" href="#">冰纹管理系统</a>
                    <ListBtn 
                        open={this.props.sideNavState} 
                        className="float-right mr-1" 
                        onClick={
                            (event) => {
                                if(this.props.sideNavState){
                                    this.props.setSideNavState(false);
                                }
                                else{
                                    this.props.setSideNavState(true);
                                }
                            }
                        }
                    />
                </div>
                <div className="navbar-menu collapse navbar-collapse">
                    <div className="input-group navbar-search">
                        <input type="text" className="form-control" placeholder="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-info btn-sm" type="button">
                                <span className="oi oi-magnifying-glass" title="icon name" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <ul className="navbar-nav">
                        {menuItemLis}
                    </ul>
                    <span className="text-white float-right">
                        你好，{this.state.userName}
                        <img className="rounded-circle navbar-avatar"
                            src={(this.state.headSculpture == null || this.state.headSculpture == "") ? DefaultAvatar : this.state.headSculpture} alt="Card image" />
                    </span>
                    <button onClick={this.logoutClick} type="button" className="btn btn-info float-right" >
                        <span className="oi oi-account-logout" title="icon name" aria-hidden="true"></span>
                        退出登录
                    </button>
                </div>
            </nav>
        );
    }
}

Nav.propsTypes = {
    topLevelMenus: PropsTypes.array.isRequired,
    selectedTopMenu: PropsTypes.object,
    topLevelMenusSelect: PropsTypes.func.isRequired,
    sideNavState: PropsTypes.bool.isRequired,
    setSideNavState: PropsTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let rootState = getIEStore().getState();

    return {
        topLevelMenus: rootState.topLevelMenus,
        selectedTopMenu: state.selectedTopMenu,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        topLevelMenusSelect: (menu) => { dispatch(topLevelMenusSelect(menu)) }
    }
}

const NavContain = LayoutRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps // 关于dispatch
)(withRouter(Nav))

export default NavContain;