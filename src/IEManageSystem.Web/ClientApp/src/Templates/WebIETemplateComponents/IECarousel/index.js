import Component from './Component'
import Preview from './Preview'
import SettingConfig from './SettingConfig'
import DataConfig from './DataConfig'
import describeBuilder from 'IETemplateComponents/IECarousel'
import RNComponent from 'RNIETemplateComponents/IECarousel/Component'

export const RNDescribe = describeBuilder(RNComponent, Preview, SettingConfig, DataConfig);
export default describeBuilder(Component, Preview, SettingConfig, DataConfig);