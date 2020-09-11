import Component from './Component'
import Preview from './Preview'
import SettingConfig from './SettingConfig'
import DataConfig from './DataConfig'
import describeBuilder from 'IETemplateComponents/IEInfoGroup'
import RNComponent from 'RNIETemplateComponents/IEInfoGroup/Component'

export const RNDescribe = (RNComponent, Preview, SettingConfig, DataConfig);
export default describeBuilder(Component, Preview, SettingConfig, DataConfig);