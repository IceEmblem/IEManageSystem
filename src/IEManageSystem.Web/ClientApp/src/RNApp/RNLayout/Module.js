import {BaseModule} from 'ice-common'
import {ModuleFactory} from 'ice-common'
import CoreModule from 'Core/Module'
import {PageProvider} from 'ice-common'
import {Page} from 'ice-common'

import BaseLayoutModule from 'BaseLayout/Module'

import LayoutComponent from './Layout'

import RNCommonModule from 'RNCommon/Module'

export default class Module extends BaseModule
{
    initialize(){
        PageProvider.register(new Page("RNLayout", "/", LayoutComponent));
    }
}

new ModuleFactory().register(Module, [
    BaseLayoutModule,
    CoreModule,
    RNCommonModule
]);