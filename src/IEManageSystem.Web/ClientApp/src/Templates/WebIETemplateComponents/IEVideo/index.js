import Component from './Component'
import Preview from './Preview'
import SettingConfig from './SettingConfig'
import DataConfig from './DataConfig'
import describeBuilder from 'IETemplateComponents/IEVideo'
// import RNComponent from 'RNIETemplateComponents/Text/Component'

// export const RNDescribe = describeBuilder(RNComponent, Preview, SettingConfig, DataConfig);
export default describeBuilder(Component, Preview, SettingConfig, DataConfig);