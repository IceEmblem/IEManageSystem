import React from 'react'
import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import CoreModule from 'Core/Module'
import PageProvider from 'Core/Page/PageProvider'
import Page from 'Core/Page/Page'

import BaseLayoutModule from 'BaseLayout/Module'

import LayoutComponent from './Layout'

export default class Module extends BaseModule
{
    initialize(){
        PageProvider.register(new Page("RNLayout", "/", LayoutComponent));
    }
}

new ModuleFactory().register(Module, [
    BaseLayoutModule,
    CoreModule
]);