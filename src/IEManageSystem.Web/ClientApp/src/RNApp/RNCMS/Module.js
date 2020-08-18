// 核心模块依赖
import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import CoreModule from 'Core/Module';
import PageProvider from 'Core/Page/PageProvider'
import Page from 'Core/Page/Page'

// BaseCmsManage 模块依赖
import BaseCmsManageModule from 'BaseCMSManage/Module';

// 初始化时加载
import Home from './Home'
import RegisterTemplateManager from './Component/Components/RegisterTemplateManager'


export default class Module extends BaseModule {
    initialize() {
        PageProvider.register(new Page("Home", "/", Home));
        RegisterTemplateManager.init();
    }
}

new ModuleFactory().register(Module, [
    CoreModule,
    BaseCmsManageModule,
]);