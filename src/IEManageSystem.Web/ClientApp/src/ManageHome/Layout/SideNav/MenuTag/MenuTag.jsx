import React from 'react';
import { NavLink } from 'react-router-dom';

import ListBtn from 'ListBtn';
import "./MenuTag.css";

export default class MenuTag extends React.Component
{
    // props.selectedSideMenu
    // props.sideMenuSelect
    constructor(props)
    {
        super(props);

        this.state = {
            listBtnOpen: false
        }

        this.curMenu = null;
        this.menuItems = null;

        let menuItemString = $.cookie('SideNav_MenuTag');
        if (menuItemString === null || menuItemString === undefined) {
            this.menuItems = [];
        }
        else {
            this.menuItems = [];
            try {
                this.menuItems = JSON.parse(menuItemString);
            }
            catch(e) {
                this.menuItems = [];
            }

            if ($.isArray(this.menuItems) === false) {
                this.menuItems = [];
            }
        }
    }

    componentWillMount() {
        this.updateTag(this.props);
    }

    componentWillUpdate(nextProps, nextState) {
        this.updateTag(nextProps);
    }

    updateTag(props) 
    {
        if(props.selectedSideMenu == null){
            this.curMenu = null;
            return;
        }

        for (let item in this.menuItems)
        {
            if (this.menuItems[item].id === props.selectedSideMenu.id) {
                return;
            }
        }

        this.curMenu = props.selectedSideMenu;
    }

    _createMenus()
    {
        let lis = Array();

        let menuItems = this.menuItems;
        for (let item in menuItems)
        {
            let li =
                <li key={item}>
                    <span className={
                        "oi padding-right-10 " +
                        (menuItems[item].icon || "oi-tags leftmenu-icon-hide")
                    } title="icon name" aria-hidden="true">
                    </span>
                    <NavLink to={menuItems[item].url} 
                        onClick={()=>{this.props.sideMenuSelect(menuItems[item])}}
                    >
                        {menuItems[item].text}
                    </NavLink>
                    <span className="oi oi-delete padding-left-10" title="icon name" aria-hidden="true"
                        onClick={
                            () => {
                                this.menuItems.splice(item, 1);
                                $.cookie('SideNav_MenuTag', JSON.stringify(this.menuItems), { expires: 30 });
                                this.setState({});

                            }
                        }
                    ></span>
                </li>;

            lis.push(li);
        }

        return <ul>
            {lis}
        </ul>;
    }

    render()
    {
        let menuItems = this._createMenus();

        return (
            <div className="d-flex justify-content-between align-items-center flex-shrink-0 leftmenu-menutag">
                <div className="text-white">
                    <span className="oi oi-tags padding-left-10 padding-right-10" title="icon name" aria-hidden="true"></span>
                    <span>
                        菜单书签
                            </span>
                </div>
                <div className="d-flex">
                    <div>
                        <ListBtn
                            open={this.state.listBtnOpen} 
                            className="float-right" 
                            onClick={
                                (event) => {
                                    if(this.state.listBtnOpen){
                                        $(".menutag-menu").hide(300);
                                        this.setState({
                                            listBtnOpen: !this.state.listBtnOpen
                                        })
                                    }
                                    else{
                                        $(".menutag-menu").show(300);
                                        this.setState({
                                            listBtnOpen: !this.state.listBtnOpen
                                        })
                                    }
                                }
                            } 
                        />
                    </div>
                    <div className="menutag-menu hide">
                        <div className="d-flex align-items-center">
                            <div className="d-flex">
                                {menuItems}
                                <button className="btn btn-info"
                                    onClick={
                                        (event) => {
                                            if (this.curMenu !== null) {
                                                for (let item in this.menuItems) {
                                                    if (this.menuItems[item].id === this.curMenu.id) {
                                                        return;
                                                    }
                                                }
                                                this.menuItems.push(this.curMenu);
                                                $.cookie('SideNav_MenuTag', JSON.stringify(this.menuItems), { expires: 30 });
                                                this.setState({});
                                            }
                                        }
                                    }
                                >
                                    <span className="oi oi-plus" title="icon name" aria-hidden="true"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}