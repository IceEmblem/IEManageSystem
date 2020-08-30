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
        new ComponentSettingConfig("FlexSetting", "内容对齐设置", IocContainer.getService(ISettingConfig)),
    ];
    Component=IocContainer.getService(IComponent);
    Preview=IocContainer.getService(IPreview);
}

const componentDescribeBuilder = () => {
    let componentDescribe = new ComponentDescribe("Container", new ComponentObject(), componentType.container, "组件容器");

    return componentDescribe;
}
export default componentDescribeBuilder;