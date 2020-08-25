import React from 'react'

// 核心模块依赖
import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import MenuProvider from 'BaseLayout/Menu/MenuProvider'
import AccessScope, { ApiScopeNodeType } from "Core/ApiScopeAuthority/AccessScope";
import CoreModule from 'Core/Module';
import BaseLayoutModule from 'BaseLayout/Module';
import {
    SafetyCertificateOutlined,
    TeamOutlined,
    UserOutlined,
    UserSwitchOutlined,
    AlertOutlined,
    GlobalOutlined,
    BarsOutlined
} from '@ant-design/icons';

// 动态加载
const AuthorizeManage = React.lazy(() => import('./AuthorizeManage'));

export default class Module extends BaseModule {
    initialize() {
        MenuProvider.registerMenu(
            {
                id: "AuthorizeManage",
                text: "站点授权管理",
                icon: SafetyCertificateOutlined,
                menuItems:
                    [
                        {
                            id: "Admin",
                            text: "管理员",
                            icon: TeamOutlined,
                            menuItems: [
                                {
                                    id: "AdminManage",
                                    text: "管理员管理",
                                    url: "/ManageHome/AuthorizeManage/AdminManage",
                                    icon: UserOutlined,
                                    accessScope:
                                        [
                                            AccessScope.AdminManage(ApiScopeNodeType.manage)
                                        ]
                                },
                                {
                                    id: "AdminRoleManage",
                                    text: "管理员角色",
                                    url: "/ManageHome/AuthorizeManage/AdminRoleManage",
                                    accessScope:
                                        [
                                            AccessScope.AdminManage(ApiScopeNodeType.manage),
                                            AccessScope.RoleManage(ApiScopeNodeType.query)
                                        ]
                                },
                                {
                                    id: "AdminPermissionManage",
                                    text: "管理员权限",
                                    url: "/ManageHome/AuthorizeManage/AdminPermissionManage",
                                    accessScope:
                                        [
                                            AccessScope.AdminManage(ApiScopeNodeType.query)
                                        ]
                                }
                            ]
                        },
                        {
                            id: "Role",
                            text: "角色",
                            icon: UserSwitchOutlined,
                            menuItems: [
                                {
                                    id: "RoleManage",
                                    text: "角色管理",
                                    url: "/ManageHome/AuthorizeManage/RoleManage",
                                    accessScope:
                                        [
                                            AccessScope.RoleManage(ApiScopeNodeType.manage)
                                        ]
                                },
                                {
                                    id: "RolePermissionManage",
                                    text: "角色权限管理",
                                    url: "/ManageHome/AuthorizeManage/RolePermissionManage",
                                    accessScope:
                                        [
                                            AccessScope.RoleManage(ApiScopeNodeType.manage),
                                            AccessScope.PermissionManage(ApiScopeNodeType.query)
                                        ]
                                }
                            ]
                        },
                        {
                            id: "Permission",
                            text: "权限管理",
                            url: "/ManageHome/AuthorizeManage/Permission",
                            icon: AlertOutlined,
                            accessScope:
                                [
                                    AccessScope.PermissionManage(ApiScopeNodeType.manage)
                                ]
                        },
                        {
                            id: "ApiScopeManage",
                            text: "功能域管理",
                            icon: GlobalOutlined,
                            menuItems: [
                                {
                                    id: "ApiScopePermission",
                                    text: "功能域权限",
                                    url: "/ManageHome/AuthorizeManage/ApiScopePermission",
                                    accessScope:
                                        [
                                            AccessScope.ApiScopeManage(ApiScopeNodeType.manage),
                                            AccessScope.PermissionManage(ApiScopeNodeType.query)
                                        ]
                                },
                                {
                                    id: "MenuPermission",
                                    text: "菜单权限",
                                    url: "/ManageHome/AuthorizeManage/MenuPermission",
                                    icon: BarsOutlined,
                                    accessScope:
                                        [
                                            AccessScope.ApiScopeManage(ApiScopeNodeType.query)
                                        ]
                                }
                            ]
                        },
                    ]
            },
            "/ManageHome/AuthorizeManage",
            AuthorizeManage,
            2
        );
    }
}

new ModuleFactory().register(Module, [
    CoreModule,
    BaseLayoutModule
]);