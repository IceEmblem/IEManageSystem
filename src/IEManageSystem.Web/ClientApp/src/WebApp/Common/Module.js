// 核心模块依赖
import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import CoreModule from 'Core/Module'
import BaseLayoutModule from 'BaseLayout/Module'

export default class Module extends BaseModule {
    initialize() {
    }
}

new ModuleFactory().register(Module, [
    CoreModule,
    BaseLayoutModule
]);