import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import CoreModule from 'Core/Module';
import ModuleList from '../ModuleList';
import MiddlewareFactory from 'Core/Middlewares/MiddlewareFactory'
import ReduxErrorMiddleware from './Middlewares/ReduxErrorMiddleware'

export default class Module extends BaseModule
{
    initialize(){
        MiddlewareFactory.register(ReduxErrorMiddleware);
    }
}

new ModuleFactory().register(Module, [...ModuleList, CoreModule]);