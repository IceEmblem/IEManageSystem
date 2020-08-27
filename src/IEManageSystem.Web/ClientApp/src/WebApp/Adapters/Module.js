import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'

export default class Module extends BaseModule
{
    initialize(){
    }

    postInitialize(){
    }
}

new ModuleFactory().register(Module, null);