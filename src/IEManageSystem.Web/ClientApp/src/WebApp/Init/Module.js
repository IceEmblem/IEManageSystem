import React from 'react'
import {BaseModule} from 'ice-common'
import {ModuleFactory} from 'ice-common'
import CoreModule from 'Core/Module';

import {PageProvider} from 'ice-common'
import {Page} from 'ice-common'

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