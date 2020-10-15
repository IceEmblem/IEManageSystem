import {BaseModule} from 'ice-common'
import {ModuleFactory} from 'ice-common'

import CommonModule from 'Common/Module'
import Theme from 'RNLayout/Theme'

// 本模块用于适配 Web 显示 App 的内容
export default class Module extends BaseModule
{
    initialize(){
    }

    postInitialize(){
        Theme.init()
    }
}

new ModuleFactory().register(Module, [
    CommonModule
]);