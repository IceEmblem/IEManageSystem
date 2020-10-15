// 核心模块依赖
import {BaseModule} from 'ice-common'
import {ModuleFactory} from 'ice-common'
import {getCookie, setCookie, delCookie} from './ToolLibrary/IETool'
import {IETool} from 'ice-common'
import {AntIcons} from 'ice-common'
import {getIcon, icons} from './AntIcons'
import Theme from './Theme'

export default class Module extends BaseModule {
    initialize() {
        AntIcons.icons = icons;
        AntIcons.getIcon = getIcon;
        
        IETool.getCookie = getCookie;
        IETool.setCookie = setCookie;
        IETool.delCookie = delCookie;
    }

    postInitialize(){
        Theme.init();
    }
}

new ModuleFactory().register(Module, [
]);