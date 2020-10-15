import ComponentSettingConfig from '../ComponentSettingConfig'
import {IocContainer} from 'ice-common'
import BaseConfig from '../BaseConfig'
import { IEFontSetting } from 'BaseCMSManage/Models/Pages/PageComponentSettingModel'

export class IFontConfigComponent extends BaseConfig{
}

IFontConfigComponent.iocKey = Symbol();

export default class FontComponentSettingConfig extends ComponentSettingConfig{
    constructor(){
        super(IEFontSetting, "通用字体设置", IocContainer.getService(IFontConfigComponent));
    }
}