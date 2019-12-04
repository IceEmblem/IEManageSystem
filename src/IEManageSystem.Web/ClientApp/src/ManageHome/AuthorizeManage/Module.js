import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import MenuProvider from 'Core/Menu/MenuProvider'
import { ApiScope } from "Core/ApiScopeAuthority/ApiScope.js";
import { ApiScopeNodeType } from "Core/ApiScopeAuthority/ApiScopeNodeType.js";
import AuthorizeManage from "./AuthorizeManage.jsx";
import 'Core/Module';

class Module extends BaseModule {
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
                                            { scopeName: ApiScope.AuthorizeManage.AdminManage, scopeNodeType: ApiScopeNodeType.manage },
                                        ]
                                },
                                {
                                    id: "AdminRoleManage",
                                    text: "管理员角色",
                                    url: "/ManageHome/AuthorizeManage/AdminRoleManage",
                                    accessScope:
                                        [
                                            { scopeName: ApiScope.AuthorizeManage.AdminManage, scopeNodeType: ApiScopeNodeType.manage },
                                            { scopeName: ApiScope.AuthorizeManage.RoleManage, scopeNodeType: ApiScopeNodeType.query },
                                        ]
                                },
                                {
                                    id: "AdminPermissionManage",
                                    text: "管理员权限",
                                    url: "/ManageHome/AuthorizeManage/AdminPermissionManage",
                                    accessScope:
                                        [
                                            { scopeName: ApiScope.AuthorizeManage.AdminManage, scopeNodeType: ApiScopeNodeType.query },
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
                                            { scopeName: ApiScope.AuthorizeManage.RoleManage, scopeNodeType: ApiScopeNodeType.manage },
                                        ]
                                },
                                {
                                    id: "RolePermissionManage",
                                    text: "角色权限管理",
                                    url: "/ManageHome/AuthorizeManage/RolePermissionManage",
                                    accessScope:
                                        [
                                            { scopeName: ApiScope.AuthorizeManage.RoleManage, scopeNodeType: ApiScopeNodeType.manage },
                                            { scopeName: ApiScope.AuthorizeManage.PermissionManage, scopeNodeType: ApiScopeNodeType.query },
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
                                    { scopeName: ApiScope.AuthorizeManage.PermissionManage, scopeNodeType: ApiScopeNodeType.manage },
                                ]
                        },
                        {
                            id: "ApiScopeManage",
                            text: "功能域管理",
                            icon: "oi-globe",
                            menuItems: [
                                {
                                    id: "ApiScopePermission",
                                    text: "功能域权限管理",
                                    url: "/ManageHome/AuthorizeManage/ApiScopePermission",
                                    accessScope:
                                        [
                                            { scopeName: ApiScope.AuthorizeManage.ApiScopeManage, scopeNodeType: ApiScopeNodeType.manage },
                                            { scopeName: ApiScope.AuthorizeManage.PermissionManage, scopeNodeType: ApiScopeNodeType.query },
                                        ]
                                },
                                {
                                    id: "MenuPermission",
                                    text: "菜单权限",
                                    url: "/ManageHome/AuthorizeManage/MenuPermission",
                                    icon: "oi-menu",
                                    accessScope:
                                        [
                                            { scopeName: ApiScope.AuthorizeManage.ApiScopeManage, scopeNodeType: ApiScopeNodeType.query },
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

new ModuleFactory().register(new Module(), "AuthorizeManageModule", [
    "CoreModule"
]);