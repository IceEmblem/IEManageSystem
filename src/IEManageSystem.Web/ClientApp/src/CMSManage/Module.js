import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import MenuProvider from 'Core/Menu/MenuProvider'
import AccessScope, { ApiScopeNodeType } from "Core/ApiScopeAuthority/AccessScope";

import CMSManage from './CMSManage.jsx';
import { reducer } from 'CMSManage/IEReduxs/Reducers'
import IERedux from 'CMSManage/IEReduxs/CmsRedux'
import RootRedux from 'Core/IEReduxs/RootRedux'
import CoreModel from 'Core/Module';
import PageProvider from 'Core/Page/PageProvider'
import Page from 'Core/Page/Page'
import Home from './Home'
import PageEdit from "./PageEdit"
import PostEdit from './PostEdit'

export default class Module extends BaseModule {
    initialize() {
        MenuProvider.registerMenu(
            {
                id: "CMSManage",
                text: "CMS管理",
                icon: "oi-document",
                url: "/ManageHome/CMSManage",
                menuItems: [
                    {
                        id: "Menu",
                        text: "菜单管理",
                        icon: "oi-menu",
                        url: "/ManageHome/CMSManage/Menu",
                        accessScope:
                            [
                                AccessScope.Menu(ApiScopeNodeType.manage)
                            ]
                    },
                    {

                        id: "PageManage",
                        text: "页面管理",
                        icon: "oi-file",
                        url: "/ManageHome/CMSManage/PageManage",
                        accessScope:
                            [
                                AccessScope.Page(ApiScopeNodeType.manage)
                            ]
                    },
                    {

                        id: "PictureManage",
                        text: "图片管理",
                        icon: "oi-image",
                        url: "/ManageHome/CMSManage/PictureManage",
                        accessScope:
                            [
                                AccessScope.Picture(ApiScopeNodeType.manage)
                            ]
                    },
                    {

                        id: "LogicManage",
                        text: "组件逻辑管理",
                        icon: "oi-image",
                        url: "/ManageHome/CMSManage/LogicManage",
                        accessScope:
                            [
                                AccessScope.Logic(ApiScopeNodeType.manage)
                            ]
                    }
                ]
            },
            "/ManageHome/CMSManage",
            CMSManage,
            3
        );

        IERedux.setReducer(reducer);
        RootRedux.register(IERedux);
        PageProvider.register(new Page("Home", "/", Home));
        PageProvider.register(new Page("PageEdit", "/ManageHome/CMSManage/PageEdit/:pageName", PageEdit));
        PageProvider.register(new Page("PostEdit", "/ManageHome/CMSManage/PostEdit/:pageName/:pageDataName?", PostEdit));
    }
}

new ModuleFactory().register(Module, [
    CoreModel
]);