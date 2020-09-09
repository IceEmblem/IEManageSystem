import BaseComponentObject from '../../BaseComponents/BaseComponent';
import ComponentDataConfig from '../../BaseComponents/BaseContentLeafComponent/ComponentDataConfig'
import ComponentDescribe, {componentType} from '../../ComponentDescribe'
import ContainerConfig from  '../../BaseComponents/BaseContainerComponent/ContainerConfig'
import InteractiveComponentConfig from '../../BaseComponents/InteractiveComponent/InteractiveComponentConfig'
import ComponentSettingConfig from '../../BaseComponents/BaseComponent/ComponentSettingConfig'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import IPreview from './IPreview'
import IDataConfig from './IDataConfig'
import ISettingConfig from './ISettingConfig'

class ComponentObject extends BaseComponentObject{
    ComponentSettingConfigs = [
        new InteractiveComponentConfig(),
        new ContainerConfig(1),
        new ComponentSettingConfig(undefined, '图片配置', IocContainer.getService(ISettingConfig)),
    ];
    ComponentDataConfig = new ComponentDataConfig(IocContainer.getService(IDataConfig))
    
    Component=IocContainer.getService(IComponent)
    Preview=IocContainer.getService(IPreview)
}

const componentDescribeBuilder = () => new ComponentDescribe("IEImg", new ComponentObject(), componentType.other, "IE图片");
export default componentDescribeBuilder;