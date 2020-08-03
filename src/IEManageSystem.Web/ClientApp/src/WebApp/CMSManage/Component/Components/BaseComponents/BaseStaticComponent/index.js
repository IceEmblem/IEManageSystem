import BaseCommonComponentObject, {BaseStaticComponent, BaseStaticComponentProps} from 'BaseCMSManage/Components/BaseComponents/BaseStaticComponent'
import {buildBasicSettingConfig} from '../BaseComponent';

export default class StaticComponentObject extends BaseCommonComponentObject {
    BasicSettingConfig = buildBasicSettingConfig();
} 

export {BaseStaticComponent, BaseStaticComponentProps}