import BaseCommonComponentObject, {BaseConfig, BaseComponent, BaseComponentProps, ComponentSettingConfig} from 'BaseCMSManage/Components/BaseComponents/BaseComponent'
import {buildBasicSettingConfig} from './BasicSettingConfig';

// 组件对象
export default class BaseComponentObject extends BaseCommonComponentObject {
    BasicSettingConfig = buildBasicSettingConfig();
}

export {
    buildBasicSettingConfig,
    // 以下属性为 BaseCMSManage 模块
    BaseConfig,
    ComponentSettingConfig,
    BaseComponent,
    BaseComponentProps,
}