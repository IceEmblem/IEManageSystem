import BaseComponentObject, {ComponentSettingConfig} from '../../BaseComponents/BaseComponent'
import ContainerConfig from  '../../BaseComponents/BaseContainerComponent/ContainerConfig'
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import ISettingConfig from './ISettingConfig'
import IPreview from './IPreview'

class ComponentObject extends BaseComponentObject {
    ComponentSettingConfigs = [
        new ContainerConfig(),
        new ComponentSettingConfig(undefined, "动画设置", IocContainer.getService(ISettingConfig)),
    ];
    Component=IocContainer.getService(IComponent);
    Preview=IocContainer.getService(IPreview);
}

const componentDescribeBuilder = () => {
    let componentDescribe = new ComponentDescribe("IEAnimation", new ComponentObject(), componentType.container, "IE动画组件");

    return componentDescribe;
}
export default componentDescribeBuilder;