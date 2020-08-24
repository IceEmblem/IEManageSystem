import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
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

const componentDescribeBuilder = () => new ComponentDescribe("IEButton", new ComponentObject(), componentType.other, "IE按钮");
export default componentDescribeBuilder;