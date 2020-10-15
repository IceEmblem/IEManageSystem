import {BaseModule} from 'ice-common'
import {ModuleFactory} from 'ice-common'
import {MiddlewareFactory} from 'ice-common'
import {fecth} from 'Core/Middlewares/FecthMiddlewares'
import {IEStore} from 'ice-common'
import {getSiteSettingsFetch} from 'Core/IEReduxs/Actions'
import RootRedux from 'Core/IEReduxs/RootRedux'
import {reducer} from 'Core/IEReduxs/Reducer'

export default class Module extends BaseModule
{
    initialize(){
        MiddlewareFactory.register(fecth);
        RootRedux.setReducer(reducer);
    }

    postInitialize(){
        IEStore.createIEStore(RootRedux.getReducer());
        IEStore.ieStore.dispatch(getSiteSettingsFetch());
    }
}

new ModuleFactory().register(Module, [
]);