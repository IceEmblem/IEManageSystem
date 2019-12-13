import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import MiddlewareFactory from 'Core/Middlewares/MiddlewareFactory'
import {fecth} from 'Core/Middlewares/FecthMiddlewares'
import {createIEStore, getIEStore} from 'Core/IEStore'
import {createTopLevelMenusFetch} from 'Core/IEReduxs/Actions'
import RootRedux from 'Core/IEReduxs/RootRedux'
import {reducer} from 'Core/IEReduxs/Reducer'

export default class Module extends BaseModule
{
    initialize(){
        new MiddlewareFactory().register(fecth);
        RootRedux.setReducer(reducer);
    }

    postInitialize(){
        createIEStore();
        let store = getIEStore();
        store.dispatch(createTopLevelMenusFetch());
    }
}

new ModuleFactory().register(Module, null);