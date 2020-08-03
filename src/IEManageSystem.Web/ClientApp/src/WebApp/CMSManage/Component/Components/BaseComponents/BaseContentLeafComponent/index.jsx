import BaseCommonComponentObject, { BaseContentLeafComponent, BaseContentLeafComponentProps } from 'BaseCMSManage/Components/BaseComponents/BaseContentLeafComponent';
import {buildBasicSettingConfig} from '../BaseComponent';

export default class ContentLeafComponentObject extends BaseCommonComponentObject {
    BasicSettingConfig = buildBasicSettingConfig();
}

export { BaseContentLeafComponent, BaseContentLeafComponentProps }