import React from "react";
import ResourceForm from 'ResourceForm/ResourceForm.jsx';
import Describe from 'ResourceForm/Describe.js';
import { ResourceDescribeValueType } from 'ResourceForm/ResourceDescribeValueType.js';

import ConfirmBox from 'ConfirmBox/ConfirmBox.jsx';

import {ieReduxFetch} from 'Core/IEReduxFetch'

import "./Menu.css";

const operateState = {
    add: "add",
    update: "update",
    delete: "delete",
    none: "none"
};

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.describes = [];

        [
            { name: "name", text: "菜单名", isId: false, isName: false, isEditCanEdit: false, valueType: ResourceDescribeValueType.text, col: 12 },
            { name: "displayName", text: "显示名称", isId: false, isName: false, isEditCanEdit: false, valueType: ResourceDescribeValueType.text, col: 12 },
            { name: "icon", text: "图标", isId: false, isName: false, isEditCanEdit: false, valueType: ResourceDescribeValueType.text, col: 12 },
            { name: "pageName", text: "页面名称", isId: false, isName: false, isEditCanEdit: false, valueType: ResourceDescribeValueType.text, col: 12 },
            { name: "pageDataName", text: "文章名称", isId: false, isName: false, isEditCanEdit: false, valueType: ResourceDescribeValueType.text, col: 12 },
            { name: "menuType", text: "菜单类型", isId: false, isName: false, isEditCanEdit: false, valueType: ResourceDescribeValueType.radio, col: 12,
                valueTexts: [{value:"CompositeMenu", text:"组合菜单"}, {value:"LeafMenu", text:"叶子菜单"}]
            },
        ].forEach(element => {
            this.describes.push(new Describe(element));
        });

        this.state = {
            rootMenu: null,
            menus: [],
            operateState: operateState.none,
            currentMenu: null,
            fromModalShow: false,
            confirmBoxShow: false
        };

        this.getMenus = this.getMenus.bind(this);
        this.addMenu = this.addMenu.bind(this);
        this.deleteMenu = this.deleteMenu.bind(this);
        this.updateMenu = this.updateMenu.bind(this);
    }

    componentDidMount(){
        this.getMenus();
    }

    getMenus() {
        let postData = {
            menuName: this.props.menuName
        };

        ieReduxFetch("/api/Menu/GetMenu", postData)
		.then(value => {
            this.setState({ rootMenu: value.menu, menus: value.menu.menus });
		});
    }

    addMenu(resource) {
        this.setState({ fromModalShow: false });

        let postData = resource;
        postData.parentMenuId = this.state.currentMenu.id;

        let url = null;
        if (resource.menuType == "CompositeMenu") {
            url = "/api/MenuManage/AddCompositeMenu";
        }
        else {
            url = "/api/MenuManage/AddLeafMenu";
        }

        ieReduxFetch(url, postData)
		.then(value => {
            this.getMenus();
		});
    }

    deleteMenu(resource) {
        let postData = resource;

        ieReduxFetch("/api/MenuManage/RemoveMenu", postData)
		.then(value => {
            this.getMenus();
		});
    }

    updateMenu(resource) {
        this.setState({ fromModalShow: false });

        let postData = resource;

        ieReduxFetch("/api/MenuManage/UpdateMenu", postData)
		.then(value => {
            this.getMenus();
		});
    }

    createRootMenu(menu) {
        let childsMenus = menu.menus || [];

        return (
            <div>
                <label>
                    <div className="cms-menu-title">
                        <div>
                            <a href="javescript:void(0);"
                                onClick={
                                    () => { this.setState({ operateState: operateState.update, currentMenu: menu, fromModalShow: true }) }
                                }
                            ><span className="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span></a>
                            <a href="javescript:void(0);"
                                onClick={
                                    () => { this.setState({ operateState: operateState.delete, currentMenu: menu, confirmBoxShow: true }) }
                                }
                            ><span className="oi oi-trash padding-right-10" title="icon name" aria-hidden="true"></span></a>
                            <span>{menu.displayName}</span>
                        </div>
                    </div>
                    <div className='cms-menu-content'>
                        <ul>
                            {childsMenus.map(item => (
                                <li>
                                    <a href="javescript:void(0);"
                                        onClick={
                                            () => { this.setState({ operateState: operateState.update, currentMenu: item, fromModalShow: true }) }
                                        }
                                    ><span className="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span></a>
                                    <a href="javescript:void(0);"
                                        onClick={
                                            () => { this.setState({ operateState: operateState.delete, currentMenu: item, confirmBoxShow: true }) }
                                        }
                                    ><span className="oi oi-trash padding-right-10" title="icon name" aria-hidden="true"></span></a>
                                    <span>{item.displayName}</span>
                                </li>))
                            }
                            {
                                menu.menuType == "CompositeMenu" &&
                                (<li className="bg-success">
                                    <a className="text-white w-100" href="javescript:void(0);"
                                        onClick={
                                            () => {
                                                this.setState({ operateState: operateState.add, currentMenu: menu, fromModalShow: true });
                                            }
                                        }
                                    ><span className="oi oi-plus padding-right-10" title="icon name" aria-hidden="true"></span>添加</a>
                                </li>)
                            }
                        </ul>
                    </div>
                </label>
            </div>
        );
    }

    render() {
        return (
            <div className="col-md-12">
                <div className='cms-menu'>
                    {this.state.menus.map(item => this.createRootMenu(item))}
                    <div>
                        <label className="bg-success">
                            <div className="cms-menu-title">
                                <a className="text-white w-100" href="javescript:void(0);"
                                    onClick={
                                        () => {
                                            this.setState({ 
                                                operateState: operateState.add, 
                                                currentMenu: this.state.rootMenu, 
                                                fromModalShow: true });
                                        }
                                    }
                                ><span className="oi oi-plus padding-right-10" title="icon name" aria-hidden="true"></span>添加</a>
                            </div>
                        </label>
                    </div>
                </div>
                <ResourceForm
                        title="编辑菜单"
                        describes={this.describes}
                        resource={
                            this.state.operateState == operateState.add ? {} : this.state.currentMenu
                        }
                        resourceUpdate={
                            this.state.operateState == operateState.add ? 
                                resource => this.addMenu(resource) :
                                resource => this.updateMenu(resource)
                        }
                        show={this.state.fromModalShow}
                        close={()=>{this.setState({fromModalShow: false})}}
                    />
                <ConfirmBox
                        title="删除菜单"
                        text="确定删除菜单吗？"
                        backcall={() => { this.deleteMenu(this.state.currentMenu) }}
                        show={this.state.confirmBoxShow}
                        close={()=>{this.setState({confirmBoxShow: false})}}
                    />
            </div>
        );
    }
}