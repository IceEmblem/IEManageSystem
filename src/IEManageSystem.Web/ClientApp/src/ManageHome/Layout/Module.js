import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'

import CoreModule from 'Core/Module'
import PersonalModule from 'Personal/Module'
import AuthorizeManageModule from 'AuthorizeManage/Module'
import CMSManageModule from 'CMSManage/Module'

import { reducer } from 'Layout/IEReduxs/Reducers'
import LayoutRedux from 'Layout/IEReduxs/LayoutRedux'
import RootRedux from 'Core/IEReduxs/RootRedux'

export default class Module extends BaseModule
{
    initialize(){
        LayoutRedux.setReducer(reducer);
        RootRedux.register(LayoutRedux);
    }
}

new ModuleFactory().register(Module, [
    AuthorizeManageModule,
    CMSManageModule,
    PersonalModule,
    CoreModule
]);