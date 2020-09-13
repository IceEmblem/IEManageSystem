import Component from './Component'
import Preview from './Preview'
import DataConfig from './DataConfig'
import describeBuilder from 'IETemplateComponents/RichTextEditor'
import RNComponent from 'RNIETemplateComponents/RichTextEditor/Component'

export const RNDescribe = describeBuilder(RNComponent, Preview, undefined, DataConfig);
export default describeBuilder(Component, Preview, undefined, DataConfig);