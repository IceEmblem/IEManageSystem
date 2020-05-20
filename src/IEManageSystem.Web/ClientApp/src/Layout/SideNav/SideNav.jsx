import React from 'react';
import PropsTypes from 'prop-types';
import IESideNav from 'IESideNav';
import { withRouter } from "react-router-dom";

import './SideNav.css'

import RootRedux from 'Core/IEReduxs/RootRedux';
import { ieReduxFetch } from 'Core/IEReduxFetch'

class SideNav extends React.Component {
    // props.selectTopMenu
    constructor(props) {
        super(props);

        this.state =
        {
            userName: null,              // 用户名称
            headSculpture: "",
        };

        this.getUserName();
    }

    // 获取用户名称
    getUserName() {
        let postData = {};

        ieReduxFetch("/api/User/GetUserInfo", postData)
            .then(value => {
                this.setState({ userName: value.user.name, headSculpture: value.user.headSculpture });
            })
    }

    render() {
        return (
            <IESideNav
                className={this.props.className}
                mainMenu={this.props.rootMenu}
                sideMenuSelect={(menuItem) => {
                    this.props.history.push(menuItem.url);
                    // this.props.sideMenuSelect(menuItem);
                }}
            />
        );
    }
}

SideNav.propTypes = {
    rootMenu: PropsTypes.object.isRequired,
    // selectTopMenu: PropsTypes.object,
    // selectedSideMenu: PropsTypes.object,
    // sideMenuSelect: PropsTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let rootMenu = {
        id: "IERootMenu",
        menuItems: state.topLevelMenus
    }

    return {
        rootMenu: rootMenu,
        // selectTopMenu: state.selectedTopMenu,
        // selectedSideMenu: state.selectedSideMenu
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    // return {
    //     sideMenuSelect: (menu) => dispatch(sideMenuSelect(menu))
    // }
}

const SideNavContain = RootRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps, // 关于dispatch
    undefined,
    { pure: false }
)(SideNav)

export default withRouter(SideNavContain);