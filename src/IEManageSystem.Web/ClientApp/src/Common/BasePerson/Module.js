import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import CoreModule from 'Core/Module';
import BaseLayoutModule from 'BaseLayout/Module';
import IERedux from './IEReduxs/PersonalRedux'
import {reducer} from './IEReduxs/Reducers'
import RootRedux from 'Core/IEReduxs/RootRedux'

export default class Module extends BaseModule
{
    initialize()
    {
        IERedux.setReducer(reducer);
        RootRedux.register(IERedux);
    }
}

new ModuleFactory().register(Module, [
    CoreModule,
    BaseLayoutModule
]);