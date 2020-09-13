import Component from './Component'
import Preview from './Preview'
import describeBuilder from 'IETemplateComponents/IEMenu'
import RNComponent from 'RNIETemplateComponents/IEMenu/Component'

export const RNDescribe = describeBuilder(RNComponent, Preview);
export default describeBuilder(Component, Preview);