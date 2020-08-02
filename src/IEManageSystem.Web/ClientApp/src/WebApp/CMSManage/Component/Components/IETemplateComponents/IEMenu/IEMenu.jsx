import React from 'react';
import { BaseMenuComponent } from '../../BaseComponents/BaseMenuComponent';

import { Link } from 'react-router-dom'

import { Menu } from 'antd';
import {  } from '@ant-design/icons';
const { SubMenu } = Menu;

export default class IEMenu extends BaseMenuComponent {
    constructor(props) {
        super(props);
    }

    createMenus() {
        let mainMenu = this.props.menu;
        if (!mainMenu) {
            return null;
        }

        return this.createMenusIteration(mainMenu);
    }

    createMenusIteration(menu) {
        let lis = Array();

        let menuItems = menu.menus;
        for (let item in menuItems) {
            let Icon = menuItems[item].icon;

            if (menuItems[item].isCompositeMenuType()) {
                let childMenus = this.createMenusIteration(menuItems[item]);

                let menu =
                    <SubMenu key={menuItems[item].name} title={menuItems[item].displayName}>
                        {childMenus}
                    </SubMenu>

                lis.push(menu);
            }
            else {
                let menu =
                    <Menu.Item key={menuItems[item].name}>
                        <Link to={menuItems[item].createUrl()} >{menuItems[item].displayName}</Link>
                    </Menu.Item>;
                lis.push(menu);
            }
        }

        return lis;
    }

    render() {
        return (
            <Menu className="m-0 border-0" style={{backgroundColor:"#fff0"}} mode="horizontal">
                {this.createMenus()}
            </Menu>
        );
    }
}