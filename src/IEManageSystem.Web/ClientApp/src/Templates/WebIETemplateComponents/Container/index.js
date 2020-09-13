import Component from './Component'
import Preview from './Preview'
import SettingConfig from './SettingConfig'
import describeBuilder from 'IETemplateComponents/Container'
import RNComponent from 'RNIETemplateComponents/Container/Component'

export const RNDescribe = describeBuilder(RNComponent, Preview, SettingConfig);
export default describeBuilder(Component, Preview, SettingConfig);