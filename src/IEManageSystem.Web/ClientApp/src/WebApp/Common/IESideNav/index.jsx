import React from 'react';
import PropTypes from 'prop-types';

import './index.css'

import { Menu, Button } from 'antd';

const { SubMenu } = Menu;

export default class IESideNav extends React.Component {
    constructor(props) {
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
            let Icon = menuItems[item].icon;

            if (menuItems[item].menuItems !== undefined && menuItems[item].menuItems.length > 0) {
                let childMenus = this.createMenusIteration(menuItems[item]);

                let menu = 
                    <SubMenu key={menuItems[item].id} icon={Icon ? <Icon /> : undefined} title={menuItems[item].text}>
                        {childMenus}
                    </SubMenu>

                lis.push(menu);
            }
            else {
                let menu = 
                    <Menu.Item key={menuItems[item].id} icon={Icon ? <Icon /> : undefined} onClick={()=>{this.props.sideMenuSelect(menuItems[item])}}>{menuItems[item].text}</Menu.Item>;
                lis.push(menu);
            }
        }

        return lis;
    }

    render() {
        return (
            <Menu
                // defaultSelectedKeys={['1']}
                defaultOpenKeys={['Personal']}
                className={this.props.className}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
            >
                {this.createMenus()}
            </Menu>
        );
    }
}

IESideNav.propTypes = {
    // 菜单
    mainMenu: PropTypes.object,
    // 选择菜单操作
    sideMenuSelect: PropTypes.func.isRequired
}