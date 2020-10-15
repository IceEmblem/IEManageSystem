import {BaseModule} from 'ice-common'
import {ModuleFactory} from 'ice-common'
import MenuProvider from 'BaseLayout/Menu/MenuProvider'
import CoreModule from 'Core/Module';
import BaseLayoutModule from 'BaseLayout/Module';
import Setting from './Setting'
import RNCommonModule from 'RNCommon/Module'

export default class Module extends BaseModule
{
    initialize()
    {
        MenuProvider.registerMenu(
            {
                id: "Setting",
                text: "设置中心",
                icon: 'menufold',
                default: true,
                url: '/Setting',
                menuItems: [
                ]
            },
            "/Setting",
            Setting,
            2
        );
    }
}

new ModuleFactory().register(Module, [
    CoreModule,
    BaseLayoutModule,
    RNCommonModule
]);