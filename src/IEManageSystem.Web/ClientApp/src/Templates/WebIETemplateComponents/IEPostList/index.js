import Component from './Component'
import Preview from './Preview'
import SettingConfig from './SettingConfig'
import describeBuilder from 'IETemplateComponents/IEPostList'
import RNComponent from 'RNIETemplateComponents/IEPostList/Component'

export const RNDescribe = describeBuilder(RNComponent, Preview, SettingConfig);
export default describeBuilder(Component, Preview, SettingConfig);