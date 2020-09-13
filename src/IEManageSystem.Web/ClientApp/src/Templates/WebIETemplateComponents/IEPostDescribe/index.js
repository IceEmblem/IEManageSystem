import Component from './Component'
import Preview from './Preview'
import describeBuilder from 'IETemplateComponents/IEPostDescribe'
import RNComponent from 'RNIETemplateComponents/IEPostDescribe/Component'

export const RNDescribe = describeBuilder(RNComponent, Preview);
export default describeBuilder(Component, Preview);