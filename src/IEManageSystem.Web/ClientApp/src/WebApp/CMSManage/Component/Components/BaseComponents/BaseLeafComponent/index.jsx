import BaseCommonComponentObject from 'BaseCMSManage/Components/BaseComponents/BaseLeafComponent'
import {buildBasicSettingConfig} from '../BaseComponent';

export default class LeafComponentObject extends BaseCommonComponentObject {
    BasicSettingConfig = buildBasicSettingConfig();
}