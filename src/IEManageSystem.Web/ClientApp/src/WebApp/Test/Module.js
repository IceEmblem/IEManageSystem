import {BaseModule} from 'ice-common'
import {ModuleFactory} from 'ice-common'
import CoreModule from 'Core/Module';

import {PageProvider} from 'ice-common'
import {Page} from 'ice-common'
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