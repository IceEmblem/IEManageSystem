import React from 'react'
import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import CoreModule from 'Core/Module';
import LayoutModule from 'Layout/Module';

import PageProvider from 'Core/Page/PageProvider'
import Page from 'Core/Page/Page'

const Account = React.lazy(() => import('./account'));

export default class Module extends BaseModule
{
    initialize(){
        PageProvider.register(new Page("Account", "/Account", Account));
    }
}

new ModuleFactory().register(Module, [
    CoreModule,
    LayoutModule
]);