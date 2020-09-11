import Component from './Component'
import Preview from './Preview'
import describeBuilder from 'IETemplateComponents/IEComment'
import RNComponent from 'RNIETemplateComponents/IEComment/Component'

export const RNDescribe = (RNComponent, Preview);
export default describeBuilder(Component, Preview);