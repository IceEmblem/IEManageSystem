import React from 'react'
import {BaseModule} from 'ice-common'
import {ModuleFactory} from 'ice-common'
import CoreModule from 'Core/Module';
import BaseLayoutModule from 'BaseLayout/Module';

import MenuProvider from 'BaseLayout/Menu/MenuProvider'
import AccessScope, { ApiScopeNodeType } from "Core/ApiScopeAuthority/AccessScope";

import {
    SettingOutlined
} from '@ant-design/icons';

import CommonModule from 'Common/Module'

// 动态加载
const Setting = React.lazy(() => import('./Setting'));

export default class Module extends BaseModule
{
    initialize(){
        MenuProvider.registerMenu(
            {
                id: "Setting",
                text: "环境设置",
                icon: SettingOutlined,
                url: "/ManageHome/Setting",
                menuItems: [
                    {
                        id: "SiteSetting",
                        text: "站点设置",
                        url: "/ManageHome/Setting/SiteSetting",
                        accessScope:
                            [
                                AccessScope.SiteSetting(ApiScopeNodeType.manage)
                            ]
                    },
                    {
                        id: "ThemeSetting",
                        text: "主题设置",
                        url: "/ManageHome/Setting/ThemeSetting",
                        accessScope:
                            [
                            ]
                    }
                ]
            },
            "/ManageHome/Setting",
            Setting,
            4
        );
    }
}

new ModuleFactory().register(Module, [
    CoreModule,
    BaseLayoutModule,
    CommonModule
]);