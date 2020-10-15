import React from 'react'

// 核心模块依赖
import {BaseModule} from 'ice-common'
import {ModuleFactory} from 'ice-common'
import MenuProvider from 'BaseLayout/Menu/MenuProvider'
import AccessScope, { ApiScopeNodeType } from "Core/ApiScopeAuthority/AccessScope";
import CoreModule from 'Core/Module';
import BaseLayoutModule from 'BaseLayout/Module';
import {PageProvider} from 'ice-common'
import {Page} from 'ice-common'

// BaseCmsManage 模块依赖
import BaseCmsManageModule from 'BaseCMSManage/Module';

// Adapters 模块依赖
import AdaptersModule from 'Adapters/Module'

// 初始化时加载
import Home from './Home'
import SearchBoxTool from './SearchBoxTool'
import NavToolProvider from 'BaseLayout/NavTools/NavToolProvider'
import RegisterTemplateManager from './Component/Components/RegisterTemplateManager'

import {
    SnippetsOutlined,
    OrderedListOutlined,
    FileOutlined,
    FileImageOutlined,
    ForkOutlined,
    AppstoreOutlined,
    FileTextOutlined
} from '@ant-design/icons';

import CommonModule from 'Common/Module'

// 动态加载
const PageEdit = React.lazy(() => import('./PageEdit'));
const PostEdit = React.lazy(() => import('./PostEdit'));
const TemplatePageShow = React.lazy(() => import('./TemplatePageShow'));
const CMSManage = React.lazy(() => import('./CMSManage'));

export default class Module extends BaseModule {
    initialize() {
        // 向 Layout 注册菜单
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
        // 向 Layout 注册工具
        NavToolProvider.registerToolOfLeft(1, <SearchBoxTool />);
        
        // 注册模板
        RegisterTemplateManager.init();

        // 注册页面
        PageProvider.register(new Page("Home", "/", Home));
        PageProvider.register(new Page("PageEdit", "/ManageHome/CMSManage/PageEdit/:pageName/:os?", PageEdit));
        PageProvider.register(new Page("PostEdit", "/ManageHome/CMSManage/PostEdit/:pageName/:pageDataName?", PostEdit));
        PageProvider.register(new Page("TemplatePageShow", "/ManageHome/CMSManage/TemplatePageShow/:templateName/:templatePageName", TemplatePageShow));
    }
}

new ModuleFactory().register(Module, [
    CoreModule,
    BaseCmsManageModule,
    BaseLayoutModule,
    AdaptersModule,
    CommonModule
]);