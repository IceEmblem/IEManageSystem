// 核心模块依赖
import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import RootRedux from 'Core/IEReduxs/RootRedux'
import CoreModule from 'Core/Module';

// 初始化时加载
import { reducer } from 'BaseCMSManage/IEReduxs/Reducers'
import IERedux from 'BaseCMSManage/IEReduxs/CmsRedux'

import ComponentFactory from './Components/ComponentFactory'

export default class Module extends BaseModule {
    initialize() {
        IERedux.setReducer(reducer);
        RootRedux.register(IERedux);
        ComponentFactory.init();
    }
}

new ModuleFactory().register(Module, [
    CoreModule
]);