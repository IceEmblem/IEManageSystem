import Component from './Component'
import Preview from './Preview'
import describeBuilder from 'IETemplateComponents/NotFind'
import RNComponent from 'RNIETemplateComponents/NotFind/Component'

export const RNDescribe = describeBuilder(RNComponent, Preview);
export default describeBuilder(Component, Preview);