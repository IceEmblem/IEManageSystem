import React from "react";
import { NavLink } from 'react-router-dom';
import {ieReduxFetch} from 'Core/IEReduxFetch'

import './Menu.css';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menus: []
        };

        this.getMenus = this.getMenus.bind(this);
        this.getMenus();
    }

    getMenus() {
        let postData = {
        };

        ieReduxFetch("/api/Menu/GetMenus", postData)
        .then(value=>{
            this.setState({ menus: value.menus });
        });
    }

    createUrl(menu)
    {
        let url = "/Page";
        if(!menu.pageName || menu.pageName == null){
            return url;
        }

        url = url + `/${menu.pageName}`;
        if(!menu.pageDataName || menu.pageDataName == null){
            return url;
        }

        url = url + `/${menu.pageDataName}`;
        return url;
    }

    createRootMenu(menu, menuIndex) 
    {
        let childsMenus = menu.menus || [];

        return (
            <label key={menuIndex}>
                <div className="front-menu-title">
                    <div>
                        <span className={ "oi padding-right-10 " + menu.icon } title="icon name" aria-hidden="true"></span>
                        <span>
                            <NavLink className="text-white w-100" to={this.createUrl(menu)}>{menu.displayName}</NavLink>
                        </span>
                    </div>
                    {
                        childsMenus.length != 0 && <div className='front-menu-title-right'></div>
                    }
                </div>
                <div className='front-menu-content'>
                    <ul>
                        {childsMenus.map((item, index) => (
                        <li key={index}>
                            <NavLink className="text-white w-100" to={this.createUrl(item)}>{item.displayName}</NavLink>
                        </li>))}
                    </ul>
                </div>
            </label>);
    }

    render() {
        return (
            <div className='front-menu'>
                {this.state.menus.map((item, index) => this.createRootMenu(item, index))}
            </div>
        );
    }
}