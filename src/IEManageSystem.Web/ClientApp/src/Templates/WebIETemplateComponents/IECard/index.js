import Component from './Component'
import Preview from './Preview'
import DataConfig from './DataConfig'
import SettingConfig from './SettingConfig'
import describeBuilder from 'IETemplateComponents/IECard'
import RNComponent from 'RNIETemplateComponents/IECard/Component'

export const RNDescribe = (RNComponent, Preview, SettingConfig, DataConfig);
export default describeBuilder(Component, Preview, SettingConfig, DataConfig);