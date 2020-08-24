import BaseComponentObject from '../../BaseComponents/BaseContainerComponent'
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import ISettingConfig from './ISettingConfig'
import IPreview from './IPreview'

class ComponentObject extends BaseComponentObject {
    ComponentSettingConfigs = [
        IocContainer.getService(ISettingConfig)
    ];
    Component=IocContainer.getService(IComponent);
    Preview=IocContainer.getService(IPreview);
}

const componentDescribeBuilder = () => new ComponentDescribe("Container", new ComponentObject(), componentType.container, "组件容器");
export default componentDescribeBuilder;