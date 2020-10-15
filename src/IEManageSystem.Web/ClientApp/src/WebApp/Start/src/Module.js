import {BaseModule} from 'ice-common'
import {ModuleFactory} from 'ice-common'
import CoreModule from 'Core/Module';
import ModuleList from '../../ModuleList';
import {MiddlewareFactory} from 'ice-common'
import ReduxErrorMiddleware from './Middlewares/ReduxErrorMiddleware'

export default class Module extends BaseModule
{
    initialize(){
        MiddlewareFactory.register(ReduxErrorMiddleware);
    }
}

new ModuleFactory().register(Module, [...ModuleList, CoreModule]);