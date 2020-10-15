// 核心模块依赖
import {BaseModule} from 'ice-common'
import {ModuleFactory} from 'ice-common'
import CoreModule from 'Core/Module'
import RNCommonModule from 'RNCommon/Module'

export default class Module extends BaseModule {
    initialize() {
    }
}

new ModuleFactory().register(Module, [
    CoreModule,
    RNCommonModule
]);