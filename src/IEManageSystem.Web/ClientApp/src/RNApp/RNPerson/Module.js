import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import MenuProvider from 'BaseLayout/Menu/MenuProvider'
import CoreModule from 'Core/Module';
import BaseLayoutModule from 'BaseLayout/Module';
import BasePersonModule from 'BasePerson/Module'
import Person from './Person'

export default class Module extends BaseModule
{
    initialize()
    {
        MenuProvider.registerMenu(
            {
                id: "Personal",
                text: "个人中心",
                icon: 'user',
                default: true,
                url: '/Personal',
                menuItems: [
                ]
            },
            "/Personal",
            Person,
            2
        );
    }
}

new ModuleFactory().register(Module, [
    CoreModule,
    BasePersonModule,
    BaseLayoutModule
]);