import React from 'react';
import { NavLink } from 'react-router-dom';
import {BaseMenuComponent} from '../../BaseComponents/BaseMenuComponent'

import './IEMenu.css'

export default class IEMenu extends BaseMenuComponent{
    createRootMenu(menu, menuIndex) 
    {
        let childsMenus = menu.menus || [];

        return (
            <label key={menuIndex}>
                <div className="ie-menu-title">
                    <div>
                        <span className={ "oi padding-right-10 " + menu.icon } title="icon name" aria-hidden="true"></span>
                        <span>
                            <NavLink className="text-white w-100" to={this.createUrl(menu)}>{menu.displayName}</NavLink>
                        </span>
                    </div>
                    {
                        childsMenus.length != 0 && <div className='ie-menu-title-right'></div>
                    }
                </div>
                <div className='ie-menu-content'>
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
            <div className='ie-menu'>
                {this.state.menus.map((item, index) => this.createRootMenu(item, index))}
            </div>
        );
    }
}