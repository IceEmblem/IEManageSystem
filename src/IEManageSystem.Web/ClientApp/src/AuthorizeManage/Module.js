import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import MenuProvider from 'Core/Menu/MenuProvider'
import AccessScope, { ApiScopeNodeType } from "Core/ApiScopeAuthority/AccessScope";
import AuthorizeManage from "./AuthorizeManage.jsx";
import CoreModel from 'Core/Module';

export default class Module extends BaseModule {
    initialize() {
        MenuProvider.registerMenu(
            {
                id: "AuthorizeManage",
                text: "站点授权管理",
                icon: "oi-shield",
                menuItems:
                    [
                        {
                            id: "Admin",
                            text: "管理员",
                            icon: "oi-people",
                            menuItems: [
                                {
                                    id: "AdminManage",
                                    text: "管理员管理",
                                    url: "/ManageHome/AuthorizeManage/AdminManage",
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
                            icon: "oi-cog",
                            accessScope:
                                [
                                    AccessScope.PermissionManage(ApiScopeNodeType.manage)
                                ]
                        },
                        {
                            id: "ApiScopeManage",
                            text: "功能域管理",
                            icon: "oi-globe",
                            menuItems: [
                                {
                                    id: "ApiScopePermission",
                                    text: "功能域权限",
                                    url: "/ManageHome/AuthorizeManage/ApiScopePermission",
                                    icon: "oi-cog",
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
                                    icon: "oi-menu",
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
            AuthorizeManage
        );
    }
}

new ModuleFactory().register(Module, [
    CoreModel
]);