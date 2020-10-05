import Component from './Component'
import Preview from './Preview'
import describeBuilder from 'IETemplateComponents/IETheme'
import RNComponent from 'RNIETemplateComponents/IETheme/Component'

export const RNDescribe = describeBuilder(RNComponent, Preview, undefined, undefined);
export default describeBuilder(Component, Preview, undefined, undefined);