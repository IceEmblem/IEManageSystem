import React from 'react';
import PropTypes from 'prop-types';

import './index.css'

export default class IESideNav extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            currentSelectedUrl: ""
        }
    }

    createMenus() {
        let mainMenu = this.props.mainMenu;
        if (!mainMenu) {
            return null;
        }

        return this.createMenusIteration(mainMenu);
    }

    createMenusIteration(menu) {
        let lis = Array();

        let menuItems = menu.menuItems;
        for (let item in menuItems) {
            let icon = <span className={
                "oi padding-right-10 " + (menuItems[item].icon || "oi-tags iesidenav-icon-hide")
            } title="icon name" aria-hidden="true">
            </span>
            let text = <span>{" " + menuItems[item].text}</span>;

            let navLink = null;
            let childMenus = null;
            if (menuItems[item].menuItems !== undefined && menuItems[item].menuItems.length > 0) {
                navLink =
                    <a href="javascript:void(0)" className="text-white" onClick={
                        event => {
                            // 隐藏所有子菜单
                            let lis = $(event.currentTarget).parents("ul").eq(0).children("li");
                            lis.children("div").hide(500);
                            lis.children("a").find("span.oi-chevron-right").removeClass("rotate90");

                            let div = $(event.target).parents("li").eq(0).children("div");
                            if (div.css("display") === "none") {
                                div.show(500);
                                $(event.target).find("span.oi-chevron-right").addClass("rotate90");
                            }
                            else {
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
            else {
                navLink =
                    <a className={`text-white ${this.state.currentSelectedUrl == menuItems[item].url && "iesidenav_css_li_active"}`}
                        onClick={() => {
                            this.setState({currentSelectedUrl: menuItems[item].url});
                            this.props.sideMenuSelect(menuItems[item]); 
                        }}
                    >
                        {icon}
                        {text}
                    </a>;
            }

            let li =
                <li key={item} className="iesidenav_css_li">
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

    render() {
        let menus = this.createMenus();

        return (
            <div className="iesidenav-menu flex-grow-1 flex-shrink-1">
                <div>
                    {menus}
                </div>
            </div>
        );
    }
}

IESideNav.propTypes = {
    // 菜单
    mainMenu: PropTypes.object,
    // 选择菜单操作
    sideMenuSelect: PropTypes.func.isRequired
}