import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import CoreModule from 'Core/Module';

import MenuProvider from 'Core/Menu/MenuProvider'
import AccessScope, { ApiScopeNodeType } from "Core/ApiScopeAuthority/AccessScope";

import Setting from './Setting';

import {
    SettingOutlined
} from '@ant-design/icons';

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
    CoreModule
]);