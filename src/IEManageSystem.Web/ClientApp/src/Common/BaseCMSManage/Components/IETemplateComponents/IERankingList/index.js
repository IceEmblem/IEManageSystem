import BaseComponentObject from '../../BaseComponents/BaseComponent';
import PageLeafComponentSettingConfig from '../../BaseComponents/BasePageLeafComponent/PageLeafComponentSettingConfig'
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import IPreview from './IPreview'

class ComponentObject extends BaseComponentObject{
    ComponentSettingConfigs=[
        new PageLeafComponentSettingConfig()
    ]
    Component=IocContainer.getService(IComponent)
    Preview=IocContainer.getService(IPreview)
}

const componentDescribeBuilder = () => new ComponentDescribe("IERankingList", new ComponentObject(), componentType.page, "IE排行榜");
export default componentDescribeBuilder;