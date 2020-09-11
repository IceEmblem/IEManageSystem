import Component from './Component'
import Preview from './Preview'
import SettingConfig from './SettingConfig'
import describeBuilder from 'IETemplateComponents/IEBottomNav'
import RNComponent from 'RNIETemplateComponents/IEBottomNav/Component'

export const RNDescribe = (RNComponent, Preview, SettingConfig);
export default describeBuilder(Component, Preview, SettingConfig);