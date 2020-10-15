import {BaseComponentSettingConfig} from '../BaseComponent'
import {IocContainer} from 'ice-common'
import ComponentContainer from './ComponentContainer'
import {BaseConfig} from '../BaseComponent'

export class IPageLeafSettingConfig extends BaseConfig{
}
IPageLeafSettingConfig.iocKey = Symbol()

export default class extends BaseComponentSettingConfig{
    name = 'iePageLeafSetting';
    displayName = '文章配置';
    ConfigComponent = IocContainer.getService(IPageLeafSettingConfig);
    ComponentContainer = ComponentContainer;
}