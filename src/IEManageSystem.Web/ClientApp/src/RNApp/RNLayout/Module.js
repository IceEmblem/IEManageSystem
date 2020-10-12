import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import CoreModule from 'Core/Module'
import PageProvider from 'Core/Page/PageProvider'
import Page from 'Core/Page/Page'

import BaseLayoutModule from 'BaseLayout/Module'

import LayoutComponent from './Layout'

import Theme from './Theme'
import RNCommonModule from 'RNCommon/Module'

export default class Module extends BaseModule
{
    initialize(){
        PageProvider.register(new Page("RNLayout", "/", LayoutComponent));
    }

    postInitialize(){
        Theme.init();
    }
}

new ModuleFactory().register(Module, [
    BaseLayoutModule,
    CoreModule,
    RNCommonModule
]);