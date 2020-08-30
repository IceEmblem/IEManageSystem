import BaseComponentObject, {ComponentSettingConfig} from '../../BaseComponents/BaseComponent';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import IPreview from './IPreview'
import ISettingConfig from './ISettingConfig'

class ComponentObject extends BaseComponentObject{
    ComponentSettingConfigs = [
        new ComponentSettingConfig("Setting", "链接设置", IocContainer.getService(ISettingConfig))
    ];
    Component=IocContainer.getService(IComponent)
    Preview=IocContainer.getService(IPreview)
}

const componentDescribeBuilder = () => new ComponentDescribe("IELink", new ComponentObject(), componentType.other, "IE链接");
export default componentDescribeBuilder;