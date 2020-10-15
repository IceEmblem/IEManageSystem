import Component from './Component'
import Preview from './Preview'
import DataConfig from './DataConfig'
import describeBuilder from 'IETemplateComponents/IECard'
import RNComponent from 'RNIETemplateComponents/IECard/Component'

export const RNDescribe = describeBuilder(RNComponent, Preview, undefined, DataConfig);
export default describeBuilder(Component, Preview, undefined, DataConfig);