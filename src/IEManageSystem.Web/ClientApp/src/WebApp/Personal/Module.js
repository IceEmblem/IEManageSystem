import React from 'react'
import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import MenuProvider from 'BaseLayout/Menu/MenuProvider'
import CoreModule from 'Core/Module';
import BaseLayoutModule from 'BaseLayout/Module';
import IERedux from './IEReduxs/PersonalRedux'
import {reducer} from './IEReduxs/Reducers'
import RootRedux from 'Core/IEReduxs/RootRedux'
import UserTagNavTools from './UserTagNavTools'
import NavToolProvider from 'BaseLayout/NavTools/NavToolProvider'

import {
    UserOutlined,
    SolutionOutlined,
    SafetyOutlined
} from '@ant-design/icons';

// 动态加载
const Personal = React.lazy(() => import('./Personal'));

export default class Module extends BaseModule
{
    initialize()
    {
        MenuProvider.registerMenu(
            {
                id: "Personal",
                text: "个人中心",
                icon: UserOutlined,
                default: true,
                menuItems: [
                    {
                        id:"UserInfo",
                        text: "用户信息",
                        url: "/ManageHome/Personal/UserInfo",
                        icon: SolutionOutlined
                    },
                    {
                        id:"AccountSecurity",
                        text: "账号安全",
                        url: "/ManageHome/Personal/AccountSecurity",
                        icon: SafetyOutlined
                    }
                ]
            },
            "/ManageHome/Personal",
            Personal,
            1
        );
        NavToolProvider.registerToolRight(1, <UserTagNavTools />);

        IERedux.setReducer(reducer);
        RootRedux.register(IERedux);
    }
}

new ModuleFactory().register(Module, [
    CoreModule,
    BaseLayoutModule
]);