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
import TemplatePageShow from './TemplatePageShow'

import {
    SnippetsOutlined,
    OrderedListOutlined,
    FileOutlined,
    FileImageOutlined,
    ForkOutlined,
    AppstoreOutlined,
    FileTextOutlined
} from '@ant-design/icons';

export default class Module extends BaseModule {
    initialize() {
        MenuProvider.registerMenu(
            {
                id: "CMSManage",
                text: "CMS管理",
                icon: SnippetsOutlined,
                url: "/ManageHome/CMSManage",
                menuItems: [
                    {
                        id: "MenuListManage",
                        text: "菜单列表",
                        icon: OrderedListOutlined,
                        url: "/ManageHome/CMSManage/MenuListManage",
                        accessScope:
                            [
                                AccessScope.Menu(ApiScopeNodeType.manage)
                            ]
                    },
                    {

                        id: "PageManage",
                        text: "页面管理",
                        icon: FileOutlined,
                        url: "/ManageHome/CMSManage/PageManage",
                        accessScope:
                            [
                                AccessScope.Page(ApiScopeNodeType.manage)
                            ]
                    },
                    {

                        id: "PageData",
                        text: "文章管理",
                        icon: FileTextOutlined,
                        url: "/ManageHome/CMSManage/PageData",
                        accessScope:
                            [
                                AccessScope.Page(ApiScopeNodeType.manage)
                            ]
                    },
                    {

                        id: "PictureManage",
                        text: "图片管理",
                        icon: FileImageOutlined,
                        url: "/ManageHome/CMSManage/PictureManage",
                        accessScope:
                            [
                                AccessScope.Picture(ApiScopeNodeType.manage)
                            ]
                    },
                    {

                        id: "LogicManage",
                        text: "组件逻辑",
                        icon: ForkOutlined,
                        url: "/ManageHome/CMSManage/LogicManage",
                        accessScope:
                            [
                                AccessScope.Logic(ApiScopeNodeType.manage)
                            ]
                    },
                    {

                        id: "TemplateManage",
                        text: "模板管理",
                        icon: AppstoreOutlined,
                        url: "/ManageHome/CMSManage/TemplateManage",
                        accessScope:
                            [
                                AccessScope.Page(ApiScopeNodeType.manage)
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
        PageProvider.register(new Page("TemplatePageShow", "/ManageHome/CMSManage/TemplatePageShow/:templateName/:templatePageName", TemplatePageShow));
    }
}

new ModuleFactory().register(Module, [
    CoreModel
]);