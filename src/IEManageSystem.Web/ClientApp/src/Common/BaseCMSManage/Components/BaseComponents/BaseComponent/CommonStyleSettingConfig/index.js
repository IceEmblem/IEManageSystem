import ComponentSettingConfig from '../ComponentSettingConfig'
import IocContainer from 'Core/IocContainer'
import BaseConfig from '../BaseConfig'
import { IECommonStyleSetting } from 'BaseCMSManage/Models/Pages/PageComponentSettingModel'

export class ICommonStyleConfigComponent extends BaseConfig{
}

ICommonStyleConfigComponent.iocKey = Symbol();

export default class CommonStyleSettingConfig extends ComponentSettingConfig{
    constructor(){
        super(IECommonStyleSetting, "通用样式设置", IocContainer.getService(ICommonStyleConfigComponent));
    }
}