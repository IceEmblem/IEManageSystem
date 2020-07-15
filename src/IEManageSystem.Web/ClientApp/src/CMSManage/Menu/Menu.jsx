import React from "react";
import ResourceForm from 'ResourceForm/ResourceForm.jsx';
import Describe from 'ResourceForm/Describe.js';
import { ResourceDescribeValueType } from 'ResourceForm/ResourceDescribeValueType.js';
import MenuModel from 'CMSManage/Models/MenuModel'

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import { ieReduxFetch } from 'Core/IEReduxFetch'

import "./Menu.css";

import { Button, message } from 'antd';
import { UndoOutlined, SaveOutlined, EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

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
            {
                name: "menuType", text: "菜单类型", isId: false, isName: false, isEditCanEdit: false, valueType: ResourceDescribeValueType.radio, col: 12,
                valueTexts: [{ value: "CompositeMenu", text: "组合菜单" }, { value: "LeafMenu", text: "叶子菜单" }]
            },
        ].forEach(element => {
            this.describes.push(new Describe(element));
        });

        this.state = {
            rootMenu: null,
            menus: [],
            operateState: operateState.none,
            currentOperateParentMenu: null,
            currentOperateMenu: null,
            fromModalShow: false,
            confirmBoxShow: false
        };

        this.getMenus = this.getMenus.bind(this);
        this.addMenu = this.addMenu.bind(this);
        this.deleteMenu = this.deleteMenu.bind(this);
        this.updateMenu = this.updateMenu.bind(this);
    }

    componentDidMount() {
        this.getMenus();
    }

    getMenus() {
        let postData = {
            menuName: this.props.match.params.menuName
        };

        ieReduxFetch("/api/Menu/GetMenu", postData)
            .then(value => {
                let menu = new MenuModel(value.menu);
                this.setState({ rootMenu: menu, menus: menu.menus });
            });
    }

    addMenu(resource) {
        try {
            this.state.currentOperateParentMenu.addChildMenu(resource);
            this.setState({ fromModalShow: false });
        }
        catch (e) {
            this.setState({ fromModalShow: false });
            message.error(e.message);
        }
    }

    deleteMenu(resource) {
        try {
            this.state.currentOperateParentMenu.deleteChildMenu(resource);
            this.setState({ confirmBoxShow: false })
        }
        catch (e) {
            this.setState({ confirmBoxShow: false });
            message.error(e.message);
        }
    }

    updateMenu(resource) {
        try {
            this.state.currentOperateParentMenu.replaceChildMenu(this.state.currentOperateMenu.name, resource);
            this.setState({ fromModalShow: false });
        }
        catch (e) {
            this.setState({ fromModalShow: false });
            message.error(e.message);
        }
    }

    submit() {
        let postData = {
            menu: this.state.rootMenu
        }

        ieReduxFetch("/api/MenuManage/UpdateMenu", postData)
            .then(() => {
                this.getMenus();
            })
    }

    createAddItem(parentMenu) {
        return (<li className="bg-white">
            <Button icon={<PlusCircleOutlined />}
                size="small"
                type="ghost"
                onClick={
                    () => {
                        this.setState({
                            operateState: operateState.add,
                            currentOperateMenu: {},
                            currentOperateParentMenu: parentMenu,
                            fromModalShow: true
                        });
                    }
                }
            >添加</Button>
        </li>)
    }

    createItem(menu, parentMenu) {
        return (
            <div className="w-100 d-flex">
                <span className="">{menu.displayName}</span>
                <div className="flex-grow-1"></div>
                <Button size="small" type="primary" shape="circle" icon={<EditOutlined />}
                    onClick={
                        () => {
                            this.setState({
                                operateState: operateState.update,
                                currentOperateMenu: menu,
                                currentOperateParentMenu: parentMenu,
                                fromModalShow: true
                            })
                        }
                    }
                ></Button>
                <Button size="small" danger type="primary" shape="circle" icon={<DeleteOutlined />}
                    onClick={
                        () => {
                            this.setState({
                                operateState: operateState.delete,
                                currentOperateMenu: menu,
                                currentOperateParentMenu: parentMenu,
                                confirmBoxShow: true
                            })
                        }
                    }
                ></Button>
            </div>
        );
    }

    createRootMenu(menu) {
        let childsMenus = menu.menus || [];

        return (
            <div>
                <label>
                    <div className="cms-menu-title">
                        {this.createItem(menu, this.state.rootMenu)}
                    </div>
                    <div className='cms-menu-content'>
                        <ul>
                            {childsMenus.map(item => (
                                <li>
                                    {this.createItem(item, menu)}
                                </li>))
                            }
                            {
                                menu.isCompositeMenuType() &&
                                this.createAddItem(menu)
                            }
                        </ul>
                    </div>
                </label>
            </div>
        );
    }

    render() {
        return (
            <div className="col-md-12 d-flex flex-column">
                <div className='cms-menu flex-grow-1 flex-shrink-1'>
                    {this.state.menus.map(item => this.createRootMenu(item))}
                    <div>
                        <label className="bg-white">
                            <div className="cms-menu-title">
                                {this.createAddItem(this.state.rootMenu)}
                            </div>
                        </label>
                    </div>
                </div>
                <div className="d-flex justify-content-end cms-menu-btns">
                    <Button type="default" icon={<UndoOutlined />} className="mr-2"
                        onClick={() => {
                            this.getMenus();
                        }}
                    >重新加载</Button>
                    <Button type="primary" icon={<SaveOutlined />}
                        onClick={() => {
                            this.submit();
                        }}
                    >提交保存</Button>
                </div>
                <ResourceForm
                    title="编辑菜单"
                    describes={this.describes}
                    resource={
                        this.state.currentOperateMenu
                    }
                    resourceUpdate={
                        this.state.operateState == operateState.add ?
                            resource => this.addMenu(resource) :
                            resource => this.updateMenu(resource)
                    }
                    show={this.state.fromModalShow}
                    close={() => { this.setState({ fromModalShow: false }) }}
                />
                <Modal
                    title={
                        <div className="d-flex align-items-center">
                          <ExclamationCircleOutlined className="mr-3" style={{ fontSize: "22px", color: "#faad14" }} />
                          <span>删除菜单</span>
                        </div>}
                    visible={this.state.confirmBoxShow}
                    onOk={() => { this.deleteMenu(this.state.currentOperateMenu) }}
                    onCancel={() => { this.setState({ confirmBoxShow: false }) }}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>确定删除菜单吗？</p>
                </Modal>
            </div>
        );
    }
}