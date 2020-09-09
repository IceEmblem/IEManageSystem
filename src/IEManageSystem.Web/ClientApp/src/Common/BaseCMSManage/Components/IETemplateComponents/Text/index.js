import BaseComponentObject, {ComponentSettingConfig} from '../../BaseComponents/BaseComponent'
import ComponentDataConfig from '../../BaseComponents/BaseContentLeafComponent/ComponentDataConfig'
import ContainerConfig from  '../../BaseComponents/BaseContainerComponent/ContainerConfig'
import ComponentDescribe, {componentType} from '../../ComponentDescribe'
import InteractiveComponentConfig, {InteractiveType} from '../../BaseComponents/InteractiveComponent/InteractiveComponentConfig'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import IPreview from './IPreview'
import IDataConfig from './IDataConfig'
import ISettingConfig from './ISettingConfig'

class ComponentObject extends BaseComponentObject {
    ComponentSettingConfigs = [
        new InteractiveComponentConfig([InteractiveType.text]),
        new ContainerConfig(1),
        new ComponentSettingConfig("Setting", "文本设置", IocContainer.getService(ISettingConfig))
    ];
    ComponentDataConfig = new ComponentDataConfig(IocContainer.getService(IDataConfig))
    Component=IocContainer.getService(IComponent)
    Preview=IocContainer.getService(IPreview)
}

const componentDescribeBuilder = () => new ComponentDescribe("Text", new ComponentObject(), componentType.text, "文本框");
export default componentDescribeBuilder;