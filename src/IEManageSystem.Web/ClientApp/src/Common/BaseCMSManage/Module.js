// 核心模块依赖
import {BaseModule} from 'ice-common'
import {ModuleFactory} from 'ice-common'
import RootRedux from 'Core/IEReduxs/RootRedux'
import CoreModule from 'Core/Module';

// 初始化时加载
import { reducer } from 'BaseCMSManage/IEReduxs/Reducers'
import IERedux from 'BaseCMSManage/IEReduxs/CmsRedux'

export default class Module extends BaseModule {
    initialize() {
        IERedux.setReducer(reducer);
        RootRedux.register(IERedux);
    }

    postInitialize(){
    }
}

new ModuleFactory().register(Module, [
    CoreModule
]);