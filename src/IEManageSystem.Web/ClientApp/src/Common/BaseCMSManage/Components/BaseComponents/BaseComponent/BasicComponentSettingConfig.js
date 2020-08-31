import BaseComponentSettingConfig from './BaseComponentSettingConfig' 
import BaseConfig from './BaseConfig'
import IocContainer from 'Core/IocContainer'
import ComponentContainer from './ComponentContainer'

export class IBasicSettingConfig extends BaseConfig{
}
IBasicSettingConfig.iocKey = Symbol()

export default class BasicComponentSettingConfig extends BaseComponentSettingConfig {
    ComponentContainer = ComponentContainer;
    constructor()
    {
        super("ieBaiscSetting", "基本设置", IocContainer.getService(IBasicSettingConfig))
    }
}