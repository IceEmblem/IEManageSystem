import React from 'react';
import PropsTypes from 'prop-types';
import MenuTag from "./MenuTag/MenuTag.jsx";
import { sideMenuSelect } from 'Layout/IEReduxs/Actions';
import IESideNav from 'IESideNav';
import {withRouter} from "react-router-dom";

import './SideNav.css'

import DefaultAvatar from 'images/default_avatar.png';

import Weather from 'Weather/Weather.jsx';

import LayoutRedux from 'Layout/IEReduxs/LayoutRedux';
import {ieReduxFetch} from 'Core/IEReduxFetch'

class SideNav extends React.Component
{
    // props.selectTopMenu
	constructor(props){
		super(props);

        this.state = 
        {
            userName:null,              // 用户名称
            headSculpture:"",
        };

		this.getUserName();
	}

    // 获取用户名称
    getUserName(){
        let postData = {};

        ieReduxFetch("/api/User/GetUserInfo", postData)
        .then(value=>{
            this.setState({userName:value.user.name, headSculpture:value.user.headSculpture});
        })
    }

    render()
    {
        return(
            <div className="d-flex flex-column sidenav_css">
                <div className="flex-shrink-0 sidenav-avatar">
                    <div className="d-flex justify-content-center">
                        <img className="rounded-circle img-thumbnail" 
                            src={(this.state.headSculpture === null || this.state.headSculpture === "") ? DefaultAvatar:this.state.headSculpture} alt="Card image" />
                    </div>
                    <p>你好，{this.state.userName}</p>
                </div>
                <div className="flex-shrink-0 sidenav-weather">
                    <Weather showWeatherCityandtext={true} />
                </div>
                <IESideNav 
                    mainMenu={this.props.selectTopMenu}
                    sideMenuSelect={(menuItem)=>{
                        this.props.history.push(menuItem.url);
                        this.props.sideMenuSelect(menuItem);
                    }}
                />
                <MenuTag selectedSideMenu={this.props.selectedSideMenu} sideMenuSelect={this.props.sideMenuSelect} />
            </div>
        );
    }
}

SideNav.propTypes = {
    selectTopMenu: PropsTypes.object,
    selectedSideMenu: PropsTypes.object,
    sideMenuSelect: PropsTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        selectTopMenu: state.selectedTopMenu,
        selectedSideMenu: state.selectedSideMenu
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sideMenuSelect: (menu) => dispatch(sideMenuSelect(menu))
    }
}

const SideNavContain = LayoutRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps, // 关于dispatch
    undefined,
    { pure:false }
)(SideNav)

export default withRouter(SideNavContain);