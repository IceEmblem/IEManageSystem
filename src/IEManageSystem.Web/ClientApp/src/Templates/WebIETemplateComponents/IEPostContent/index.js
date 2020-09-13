import Component from './Component'
import Preview from './Preview'
import describeBuilder from 'IETemplateComponents/IEPostContent'
import RNComponent from 'RNIETemplateComponents/IEPostContent/Component'

export const RNDescribe = describeBuilder(RNComponent, Preview);
export default describeBuilder(Component, Preview);