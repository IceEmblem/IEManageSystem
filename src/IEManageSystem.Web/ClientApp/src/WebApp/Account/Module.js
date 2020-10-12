import React from 'react'
import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import CoreModule from 'Core/Module';
import BaseLayoutModule from 'BaseLayout/Module';

import PageProvider from 'Core/Page/PageProvider'
import Page from 'Core/Page/Page'

import LogoutBtnNavTool from './LogoutBtnNavTool'
import NavToolProvider from 'BaseLayout/NavTools/NavToolProvider'
import CommonModule from 'Common/Module'

const Account = React.lazy(() => import('./account'));

export default class Module extends BaseModule
{
    initialize(){
        NavToolProvider.registerToolRight(2, <LogoutBtnNavTool />);
        PageProvider.register(new Page("Account", "/Account", Account));
    }
}

new ModuleFactory().register(Module, [
    CoreModule,
    BaseLayoutModule,
    CommonModule
]);