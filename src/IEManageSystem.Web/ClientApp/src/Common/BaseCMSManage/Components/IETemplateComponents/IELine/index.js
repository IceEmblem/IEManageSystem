import BaseComponentObject, {ComponentSettingConfig} from '../../BaseComponents/BaseComponent'
import ComponentDataConfig from '../../BaseComponents/BaseContentLeafComponent/ComponentDataConfig'
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import IPreview from './IPreview'
import IDataConfig from './IDataConfig'
import ISettingConfig from './ISettingConfig'

class ComponentObject extends BaseComponentObject {
    ComponentSettingConfigs = [
        new ComponentSettingConfig("DefaultSetting", "图表设置", IocContainer.getService(ISettingConfig))
    ];
    ComponentDataConfig = new ComponentDataConfig(IocContainer.getService(IDataConfig))
    Component=IocContainer.getService(IComponent)
    Preview=IocContainer.getService(IPreview)
}

const componentDescribeBuilder = () => {
    let componentDescribe = new ComponentDescribe("IELine", new ComponentObject(), componentType.graph, "IE-折线|柱状|条形");
    componentDescribe.defauleStyle = {
        height: 250
    }
    return componentDescribe;
}
export default componentDescribeBuilder;