import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import ModuleList from './ModuleList';

export default class Module extends BaseModule
{
    initialize(){
    }
}

new ModuleFactory().register(Module, ModuleList);