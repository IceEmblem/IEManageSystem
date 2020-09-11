import Component from './Component'
import Preview from './Preview'
import SettingConfig from './SettingConfig'
import describeBuilder from 'IETemplateComponents/IEPostTitle'
import RNComponent from 'RNIETemplateComponents/IEPostTitle/Component'

export const RNDescribe = (RNComponent, Preview, SettingConfig);
export default describeBuilder(Component, Preview, SettingConfig);