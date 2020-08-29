import IComponentSettingConfig from '../BaseComponent/IComponentSettingConfig'
import IocContainer from 'Core/IocContainer'
import ComponentContainer from './ComponentContainer'
import {BaseConfig} from '../BaseComponent'

export class IPageLeftSettingConfig extends BaseConfig{
}

export default class extends IComponentSettingConfig{
    name = 'iePageLeafSetting';
    displayName = '文章配置';
    ConfigComponent = IocContainer.getService(IPageLeftSettingConfig);
    ComponentContainer = ComponentContainer;
}