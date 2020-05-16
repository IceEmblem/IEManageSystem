import React from "react";
import ResourceForm from 'ResourceForm/ResourceForm.jsx';
import Describe from 'ResourceForm/Describe.js';
import { ResourceDescribeValueType } from 'ResourceForm/ResourceDescribeValueType.js';
import MenuModel from 'CMSManage/Models/MenuModel'
import ErrorModal from 'ErrorModal/ErrorModal'

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
            currentOperateParentMenu: null,
            currentOperateMenu: null,
            fromModalShow: false,
            confirmBoxShow: false,
            errorModalShow: false,
            errorModalMessage: ""
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
            menuName: this.props.match.params.menuName
        };

        ieReduxFetch("/api/Menu/GetMenu", postData)
		.then(value => {
            let menu = new MenuModel(value.menu);
            this.setState({ rootMenu: menu, menus: menu.menus });
		});
    }

    addMenu(resource) {
        try{
            this.state.currentOperateParentMenu.addChildMenu(resource);
            this.setState({ fromModalShow: false });
        }
        catch(e){
            this.setState({fromModalShow: false, errorModalShow:true, errorModalMessage: e.message});
        }
    }

    deleteMenu(resource) {
        try{
            this.state.currentOperateParentMenu.deleteChildMenu(resource);
        }
        catch(e){
            this.setState({errorModalShow:true, errorModalMessage: e.message});
        }
    }

    updateMenu(resource) {
        try{
            this.state.currentOperateParentMenu.replaceChildMenu(resource);
            this.setState({ fromModalShow: false });
        }
        catch(e){
            this.setState({fromModalShow: false, errorModalShow:true, errorModalMessage: e.message});
        }
    }

    submit(){
        let postData = {
            menu: this.state.rootMenu
        }

        ieReduxFetch("/api/MenuManage/UpdateMenu", postData)
        .then(()=>{
            this.getMenus();
        })
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
                                    () => { this.setState({ 
                                        operateState: operateState.update, 
                                        currentOperateMenu: menu, 
                                        currentOperateParentMenu: this.state.rootMenu,
                                        fromModalShow: true }) }
                                }
                            ><span className="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span></a>
                            <a href="javescript:void(0);"
                                onClick={
                                    () => { this.setState({ 
                                        operateState: operateState.delete, 
                                        currentOperateMenu: menu, 
                                        currentOperateParentMenu: this.state.rootMenu,
                                        confirmBoxShow: true }) }
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
                                            () => { this.setState({ 
                                                operateState: operateState.update, 
                                                currentOperateMenu: item, 
                                                currentOperateParentMenu: menu,
                                                fromModalShow: true }) }
                                        }
                                    ><span className="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span></a>
                                    <a href="javescript:void(0);"
                                        onClick={
                                            () => { this.setState({ 
                                                operateState: operateState.delete, 
                                                currentOperateMenu: item, 
                                                currentOperateParentMenu: menu,
                                                confirmBoxShow: true }) }
                                        }
                                    ><span className="oi oi-trash padding-right-10" title="icon name" aria-hidden="true"></span></a>
                                    <span>{item.displayName}</span>
                                </li>))
                            }
                            {
                                menu.isCompositeMenuType() &&
                                (<li className="bg-success">
                                    <a className="text-white w-100" href="javescript:void(0);"
                                        onClick={
                                            () => {
                                                this.setState({ 
                                                    operateState: operateState.add, 
                                                    currentOperateMenu: {}, 
                                                    currentOperateParentMenu: menu,
                                                    fromModalShow: true });
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
            <div className="col-md-12 d-flex flex-column h-100">
                <div className='cms-menu flex-grow-1 flex-shrink-1'>
                    {this.state.menus.map(item => this.createRootMenu(item))}
                    <div>
                        <label className="bg-success">
                            <div className="cms-menu-title">
                                <a className="text-white w-100" href="javescript:void(0);"
                                    onClick={
                                        () => {
                                            this.setState({ 
                                                operateState: operateState.add, 
                                                currentOperateMenu: {}, 
                                                currentOperateParentMenu: this.state.rootMenu,
                                                fromModalShow: true });
                                        }
                                    }
                                ><span className="oi oi-plus padding-right-10" title="icon name" aria-hidden="true"></span>添加</a>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary btn"
                        onClick={()=>{
                            this.getMenus();
                        }}
                    >
                        <span class="oi oi-reload padding-right-10" title="icon name" aria-hidden="true"></span>
                        重新加载
                    </button>
                    <button className="btn btn-success btn"
                        onClick={()=>{
                            this.submit();
                        }}
                    >
                        <span class="oi oi-pencil padding-right-10" title="icon name" aria-hidden="true"></span>
                        提交保存
                    </button>
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
                        close={()=>{this.setState({fromModalShow: false})}}
                    />
                <ConfirmBox
                        title="删除菜单"
                        text="确定删除菜单吗？"
                        backcall={() => { this.deleteMenu(this.state.currentOperateMenu) }}
                        show={this.state.confirmBoxShow}
                        close={()=>{this.setState({confirmBoxShow: false})}}
                    />
                <ErrorModal
                    show={this.state.errorModalShow}
                    title={"发生错误了"}
                    message={this.state.errorModalMessage}
                    close={()=>{this.setState({errorModalShow: false})}}
                />
            </div>
        );
    }
}