import React from 'react'
import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'

import CoreModule from 'Core/Module'

import { reducer } from 'Layout/IEReduxs/Reducers'
import LayoutRedux from 'Layout/IEReduxs/LayoutRedux'
import RootRedux from 'Core/IEReduxs/RootRedux'
import PageProvider from 'Core/Page/PageProvider'
import Page from 'Core/Page/Page'

// 动态加载
const ManageHome = React.lazy(() => import('./ManageHome'));

export default class Module extends BaseModule
{
    initialize(){
        LayoutRedux.setReducer(reducer);
        RootRedux.register(LayoutRedux);
        PageProvider.register(new Page("AntManageHome", "/ManageHome", ManageHome));
    }
}

new ModuleFactory().register(Module, [
    CoreModule
]);