import Component from './Component'
import Preview from './Preview'
import SettingConfig from './SettingConfig'
import DataConfig from './DataConfig'
import describeBuilder from 'IETemplateComponents/IELine'
import RNComponent from 'RNIETemplateComponents/IELine/Component'

export const RNDescribe = describeBuilder(RNComponent, Preview, SettingConfig, DataConfig);
export default describeBuilder(Component, Preview, SettingConfig, DataConfig);