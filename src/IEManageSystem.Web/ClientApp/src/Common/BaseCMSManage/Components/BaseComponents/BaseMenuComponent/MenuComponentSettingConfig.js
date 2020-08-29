import IComponentSettingConfig from '../BaseComponent/IComponentSettingConfig'
import IocContainer from 'Core/IocContainer'
import ComponentContainer from './ComponentContainer'
import {BaseConfig} from '../BaseComponent'

export class IMenuSettingConfig extends BaseConfig{
}

export default class extends IComponentSettingConfig{
    name = 'ieMenuSetting';
    displayName = '菜单配置';
    ConfigComponent = IocContainer.getService(IMenuSettingConfig);
    ComponentContainer = ComponentContainer;
}