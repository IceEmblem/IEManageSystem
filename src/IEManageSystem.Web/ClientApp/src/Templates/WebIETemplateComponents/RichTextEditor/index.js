import Component from './Component'
import Preview from './Preview'
import DataConfig from './DataConfig'
import SettingConfig from './SettingConfig'
import describeBuilder from 'IETemplateComponents/RichTextEditor'
import RNComponent from 'RNIETemplateComponents/RichTextEditor/Component'

export const RNDescribe = describeBuilder(RNComponent, Preview, SettingConfig, DataConfig);
export default describeBuilder(Component, Preview, SettingConfig, DataConfig);