import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import MiddlewareFactory from 'Core/Middlewares/MiddlewareFactory'
import {fecth} from 'Core/Middlewares/FecthMiddlewares'
import {createIEStore} from 'Core/IEStore'
import {createTopLevelMenusFetch} from 'Core/IEReduxs/Actions'

class Module extends BaseModule
{
    initialize(){
        new MiddlewareFactory().register(fecth);
    }

    postInitialize(){
        createIEStore();
        createTopLevelMenusFetch();
    }
}

new ModuleFactory().register(new Module(), "CoreModule");