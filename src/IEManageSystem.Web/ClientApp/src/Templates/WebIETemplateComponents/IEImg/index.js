import Component from './Component'
import Preview from './Preview'
import DataConfig from './DataConfig'
import SettingConfig from './SettingConfig'
import describeBuilder from 'IETemplateComponents/IEImg'
import RNComponent from 'RNIETemplateComponents/IEImg/Component'

export const RNDescribe = describeBuilder(RNComponent, Preview, SettingConfig, DataConfig);
export default describeBuilder(Component, Preview, SettingConfig, DataConfig);