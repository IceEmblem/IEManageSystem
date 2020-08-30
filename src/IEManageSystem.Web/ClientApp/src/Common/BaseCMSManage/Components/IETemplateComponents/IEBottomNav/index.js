import BaseComponentObject, {ComponentSettingConfig} from '../../BaseComponents/BaseComponent'
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import ISettingConfig from './ISettingConfig'
import IPreview from './IPreview'

class ComponentObject extends BaseComponentObject{
    ComponentSettingConfigs = [
        new ComponentSettingConfig("Setting", "文本设置", IocContainer.getService(ISettingConfig)),
    ];
    Component=IocContainer.getService(IComponent);
    Preview=IocContainer.getService(IPreview);
}

const componentDescribeBuilder = () => new ComponentDescribe("IEBottomNav", new ComponentObject(), componentType.nav, "IE底部导航栏");
export default componentDescribeBuilder;