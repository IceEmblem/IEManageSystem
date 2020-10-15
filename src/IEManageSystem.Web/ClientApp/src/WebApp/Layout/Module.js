import React from 'react'
import {BaseModule} from 'ice-common'
import {ModuleFactory} from 'ice-common'
import CoreModule from 'Core/Module'
import {PageProvider} from 'ice-common'
import {Page} from 'ice-common'

import BaseLayoutModule from 'BaseLayout/Module'

import CommonModule from 'Common/Module'

// 动态加载
const ManageHome = React.lazy(() => import('./ManageHome'));

export default class Module extends BaseModule
{
    initialize(){
        PageProvider.register(new Page("AntManageHome", "/ManageHome", ManageHome));
    }
}

new ModuleFactory().register(Module, [
    BaseLayoutModule,
    CoreModule,
    CommonModule
]);