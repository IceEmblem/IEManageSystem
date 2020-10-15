import React from 'react'

// 核心模块依赖
import {BaseModule} from 'ice-common'
import {ModuleFactory} from 'ice-common'
import CoreModule from 'Core/Module';

// BaseCmsManage 模块依赖
import BaseCmsManageModule from 'BaseCMSManage/Module';

// BaseLayout 模块依赖
import BaseLayoutModule from 'BaseLayout/Module'
import NavToolProvider from 'BaseLayout/NavTools/NavToolProvider'
import MenuProvider from 'BaseLayout/Menu/MenuProvider'


// 初始化时加载
import Home from './Home'
import RegisterTemplateManager from './Component/Components/RegisterTemplateManager'

import SearchBar from './SearchBar'

import RNCommonModule from 'RNCommon/Module'

export default class Module extends BaseModule {
    initialize() {
        // 向 Layout 注册菜单
        MenuProvider.registerMenu(
            {
                id: "Home",
                text: "主页",
                icon: 'home',
                url: "/",
                // menuItems: []
            },
            "/",
            Home,
            1
        );
        NavToolProvider.registerToolOfLeft(2, <SearchBar />);
        RegisterTemplateManager.init();
    }
}

new ModuleFactory().register(Module, [
    CoreModule,
    BaseLayoutModule,
    BaseCmsManageModule,
    RNCommonModule
]);