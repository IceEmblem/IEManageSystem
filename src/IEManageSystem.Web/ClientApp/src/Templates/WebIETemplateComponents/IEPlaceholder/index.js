import Component from './Component'
import Preview from './Preview'
import describeBuilder from 'IETemplateComponents/IEPlaceholder'
import RNComponent from 'RNIETemplateComponents/IEPlaceholder/Component'

export const RNDescribe = describeBuilder(RNComponent, Preview);
export default describeBuilder(Component, Preview);