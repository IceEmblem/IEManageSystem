import BaseComponentObject, {ComponentSettingConfig} from '../../BaseComponents/BaseComponent';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'
import InteractiveComponentConfig from '../../BaseComponents/InteractiveComponent/InteractiveComponentConfig'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import ISettingConfig from './ISettingConfig'
import IPreview from './IPreview'

class ComponentObject extends BaseComponentObject {
    ComponentSettingConfigs = [
        new InteractiveComponentConfig(),
        new ComponentSettingConfig("BtnSetting", "按钮设置", IocContainer.getService(ISettingConfig))
    ];
    Component=IocContainer.getService(IComponent);
    Preview=IocContainer.getService(IPreview);
}

const componentDescribeBuilder = () => new ComponentDescribe("IEButton", new ComponentObject(), componentType.other, "IE按钮");
export default componentDescribeBuilder;