// 核心模块依赖
import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'

export default class Module extends BaseModule {
    initialize() {
    }
}

new ModuleFactory().register(Module, [
]);