import BaseCommonComponentObject, {BaseContainerComponent} from 'BaseCMSManage/Components/BaseComponents/BaseContainerComponent'
import {buildBasicSettingConfig} from '../BaseComponent';

export default class ContainerComponentObject extends BaseCommonComponentObject {
    BasicSettingConfig = buildBasicSettingConfig();
} 

export {BaseContainerComponent}
