import BaseCommonComponentObject, { BaseMenuComponent, BaseMenuComponentProps } from 'BaseCMSManage/Components/BaseComponents/BaseMenuComponent';
import {buildBasicSettingConfig} from '../BaseComponent';
import {buildMenuSettingConfig} from './MenuSettingConfig';

export default class MenuComponentObject extends BaseCommonComponentObject {
    BasicSettingConfig = buildBasicSettingConfig();
    MenuSettingConfig = buildMenuSettingConfig();
}

export { BaseMenuComponent, BaseMenuComponentProps }