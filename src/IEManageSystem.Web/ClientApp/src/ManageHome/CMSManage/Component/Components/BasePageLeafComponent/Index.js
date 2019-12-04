import BasePageLeafComponent from './BasePageLeafComponent'
import BaseComponentObject, {BaseField, BasePreview, ComponentSettingConfig} from '../BaseComponent/Index';

const ComponentObject = {
    Component: BasePageLeafComponent,
    Preview: BaseComponentObject.Preview,
    ComponentSettingConfigs: BaseComponentObject.ComponentSettingConfigs
}

export default ComponentObject

export { BaseField, BasePageLeafComponent, BasePreview, ComponentSettingConfig }