import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import CoreModule from 'Core/Module';

import PageProvider from 'Core/Page/PageProvider'
import Page from 'Core/Page/Page'
import Test from './Test'

export default class Module extends BaseModule
{
    initialize(){
        PageProvider.register(new Page("Test", "/Test", Test));
    }
}

new ModuleFactory().register(Module, [
    CoreModule
]);