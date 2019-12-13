import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import CoreModule from 'Core/Module';

import PageProvider from 'Core/Page/PageProvider'
import Page from 'Core/Page/Page'
import Account from './account'

export default class Module extends BaseModule
{
    initialize(){
        PageProvider.register(new Page("Account", "/Account", Account));
    }
}

new ModuleFactory().register(Module, [
    CoreModule
]);