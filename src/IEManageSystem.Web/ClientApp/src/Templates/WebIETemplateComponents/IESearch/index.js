import Component from './Component'
import Preview from './Preview'
import SettingConfig from './SettingConfig'
import describeBuilder from 'IETemplateComponents/IESearch'
import RNComponent from 'RNIETemplateComponents/IESearch/Component'

export const RNDescribe = describeBuilder(RNComponent, Preview, SettingConfig);
export default describeBuilder(Component, Preview, SettingConfig);