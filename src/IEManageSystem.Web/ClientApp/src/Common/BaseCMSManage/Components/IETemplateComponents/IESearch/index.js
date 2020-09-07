import BaseComponentObject, {ComponentSettingConfig} from '../../BaseComponents/BaseComponent';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import IPreview from './IPreview'
import ISettingConfig from './ISettingConfig'

class ComponentObject extends BaseComponentObject{
    ComponentSettingConfigs = [
        new ComponentSettingConfig(undefined, "组件设置", IocContainer.getService(ISettingConfig))
    ];
    Component=IocContainer.getService(IComponent)
    Preview=IocContainer.getService(IPreview)
}

const componentDescribeBuilder = () => new ComponentDescribe("IESearch", new ComponentObject(), componentType.other, "IE搜索框");
export default componentDescribeBuilder;