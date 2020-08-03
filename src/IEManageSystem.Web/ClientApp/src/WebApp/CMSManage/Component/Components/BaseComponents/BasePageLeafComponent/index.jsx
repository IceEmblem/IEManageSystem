import BaseCommonComponentObject, { BasePageLeafComponent, PageLeafComponentProps } from 'BaseCMSManage/Components/BaseComponents/BasePageLeafComponent'
import {buildBasicSettingConfig} from '../BaseComponent';
import {buildPageLeafSettingConfig} from './PageLeafSettingConfig';

export default class PageLeafComponentObject extends BaseCommonComponentObject {
    BasicSettingConfig = buildBasicSettingConfig();
    PageLeafSettingConfig = buildPageLeafSettingConfig();
}

export { BasePageLeafComponent, PageLeafComponentProps }