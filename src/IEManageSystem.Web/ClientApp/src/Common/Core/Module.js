import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import MiddlewareFactory from 'Core/Middlewares/MiddlewareFactory'
import {fecth} from 'Core/Middlewares/FecthMiddlewares'
import {createIEStore, getIEStore} from 'Core/IEStore'
import {createTopLevelMenusFetch, getSiteSettingsFetch} from 'Core/IEReduxs/Actions'
import RootRedux from 'Core/IEReduxs/RootRedux'
import {reducer} from 'Core/IEReduxs/Reducer'

export default class Module extends BaseModule
{
    initialize(){
        MiddlewareFactory.register(fecth);
        RootRedux.setReducer(reducer);
    }

    postInitialize(){
        createIEStore();
        // getIEStore().dispatch(createTopLevelMenusFetch());
        getIEStore().dispatch(getSiteSettingsFetch());
    }
}

new ModuleFactory().register(Module, null);