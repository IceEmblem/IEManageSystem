import BaseContainerComponent from './BaseContainerComponent.jsx';
import BaseComponentObject, { BasePreview, ComponentSettingConfig} from '../BaseComponent';

const ComponentObject = {
    Component: BaseContainerComponent,
    Preview: BaseComponentObject.Preview,
    ComponentSettingConfigs: BaseComponentObject.ComponentSettingConfigs
}

export default ComponentObject

export {BaseContainerComponent, BasePreview, ComponentSettingConfig}
