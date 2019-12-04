import React from 'react';
import PropsTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import MenuTag from "./MenuTag/MenuTag.jsx";
import { sideMenuSelect } from 'Layout/IEReduxs/Actions';

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

    createMenus()
    {
        let selectTopMenu = this.props.selectTopMenu;
        if(!selectTopMenu){
            return null;
        }

        return this.createMenusIteration(selectTopMenu);
    }

    createMenusIteration(menu)
    {
        let lis = Array();
        
        let menuItems = menu.menuItems;
        for(let item in menuItems)
        {
            let icon = <span className={
                                "oi padding-right-10 " + (menuItems[item].icon || "oi-tags leftmenu-icon-hide")
                            } title="icon name" aria-hidden="true">
                        </span>
            let text = <span>{" " + menuItems[item].text}</span>;

            let navLink = null;
            let childMenus = null;
            if(menuItems[item].menuItems !== undefined && menuItems[item].menuItems.length > 0)
            {
                navLink = 
                    <a href="javascript:void(0)" className="text-white" onClick={
                        event=>{
                            // 隐藏所有子菜单
                            let lis = $(event.currentTarget).parents("ul").eq(0).children("li");
                            lis.children("div").hide(500);
                            lis.children("a").find("span.oi-chevron-right").removeClass("rotate90");

                            let div = $(event.target).parents("li").eq(0).children("div");
                            if(div.css("display") === "none"){
                                div.show(500);
                                $(event.target).find("span.oi-chevron-right").addClass("rotate90");
                            }
                            else{
                                div.hide(500);
                                $(event.target).find("span.oi-chevron-right").removeClass("rotate90");
                            }
                        }
                    }>
                        {icon}
                        {text}
                        <span className="oi oi-chevron-right ml-auto" title="icon name" aria-hidden="true"></span>
                    </a>;

                childMenus = this.createMenusIteration(menuItems[item]);
            }
            else{
                navLink = 
                    <NavLink to={menuItems[item].url} activeClassName="leftmenu_css_li_active" className="text-white" 
                        onClick={()=>{this.props.sideMenuSelect(menuItems[item]);}}
                    >
                        {icon}
                        {text}
                    </NavLink>;
            }

            let li = 
                <li key={item} className="leftmenu_css_li">
                    {navLink}
                    <div className="w-100 hide">
                        {childMenus}
                    </div>
                </li>;

            lis.push(li);
        }

        return <ul className="list-group">
                    {lis}
                </ul>;
    }

    render()
    {
        let menus = this.createMenus();

        return(
            <div className="d-flex flex-column leftmenu_css">
                <div className="flex-shrink-0 leftmenu-avatar">
                    <div className="d-flex justify-content-center">
                        <img className="rounded-circle img-thumbnail" 
                            src={(this.state.headSculpture === null || this.state.headSculpture === "") ? DefaultAvatar:this.state.headSculpture} alt="Card image" />
                    </div>
                    <p>你好，{this.state.userName}</p>
                </div>
                <div className="flex-shrink-0 leftmenu-weather">
                    <Weather showWeatherCityandtext={true} />
                </div>
                <div className="leftmenu-menu flex-grow-1 flex-shrink-1">
                    <div>
                        {menus}
                    </div>
                </div>
                <MenuTag selectedSideMenu={this.props.selectedSideMenu} sideMenuSelect={this.props.sideMenuSelect} />
            </div>
        );
    }
}

SideNav.propTypes = {
    selectTopMenu: PropsTypes.object.isRequired,
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

export default SideNavContain;