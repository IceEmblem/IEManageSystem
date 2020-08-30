import {BaseComponentSettingConfig} from '../BaseComponent'
import IocContainer from 'Core/IocContainer'
import ComponentContainer from './ComponentContainer'
import {BaseConfig} from '../BaseComponent'

export class IMenuSettingConfig extends BaseConfig{
}

export default class extends BaseComponentSettingConfig{
    name = 'ieMenuSetting';
    displayName = '菜单配置';
    ConfigComponent = IocContainer.getService(IMenuSettingConfig);
    ComponentContainer = ComponentContainer;
}