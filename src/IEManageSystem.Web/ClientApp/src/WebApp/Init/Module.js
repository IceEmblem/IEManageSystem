import React from 'react'
import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import CoreModule from 'Core/Module';

import PageProvider from 'Core/Page/PageProvider'
import Page from 'Core/Page/Page'

import CommonModule from 'Common/Module'

// 动态加载
const Init = React.lazy(() => import('./index'));

export default class Module extends BaseModule
{
    initialize(){
        PageProvider.register(new Page("Init", "/Init", Init));
    }
}

new ModuleFactory().register(Module, [
    CoreModule,
    CommonModule
]);