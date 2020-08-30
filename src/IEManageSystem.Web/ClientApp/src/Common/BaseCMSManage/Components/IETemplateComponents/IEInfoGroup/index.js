import BaseComponentObject, {ComponentSettingConfig} from '../../BaseComponents/BaseComponent';
import ComponentDataConfig from '../../BaseComponents/BaseContentLeafComponent/ComponentDataConfig'
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import IPreview from './IPreview'
import IDataConfig from './IDataConfig'
import ISettingConfig from './ISettingConfig'

class ComponentObject extends BaseComponentObject{
    ComponentSettingConfigs = [
        new ComponentSettingConfig("DefaultSetting", "字段配置", IocContainer.getService(ISettingConfig))
    ];
    ComponentDataConfig = new ComponentDataConfig(IocContainer.getService(IDataConfig))
    Component=IocContainer.getService(IComponent)
    Preview=IocContainer.getService(IPreview)
}

const componentDescribeBuilder = () => new ComponentDescribe("IEInfoGroup", new ComponentObject(), componentType.text, "IE信息组");
export default componentDescribeBuilder;