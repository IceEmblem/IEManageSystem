import BaseComponent from './BaseComponent.jsx'
import BasePreview from './BasePreview.jsx'
import ComponentSettingConfig from './ComponentSettingConfig.jsx' 
import BaseField from './BaseField.jsx'

// 组件对象，每个自定义的组件都应该以组件对象的形式导出
const ComponentObject ={
    Component: BaseComponent,
    Preview: BasePreview,
    ComponentSettingConfigs: []
}

export default ComponentObject;

export {BaseField, BaseComponent, BasePreview, ComponentSettingConfig}