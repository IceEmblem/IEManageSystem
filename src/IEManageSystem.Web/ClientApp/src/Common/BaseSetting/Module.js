import {BaseModule} from 'ice-common'
import {ModuleFactory} from 'ice-common'
import {IEStore} from 'ice-common'
import {getSiteSettingsFetch} from './IEReduxs/Actions'
import Redux from './IEReduxs/IERedux'
import {reducer} from './IEReduxs/Reducer'
import RootRedux from 'Core/IEReduxs/RootRedux'
import CoreModule from 'Core/Module'

export default class Module extends BaseModule
{
    initialize(){
        Redux.setReducer(reducer);
        RootRedux.register(Redux);
    }

    postInitialize(){
        IEStore.ieStore.dispatch(getSiteSettingsFetch());
    }
}

new ModuleFactory().register(Module, [
    CoreModule
]);