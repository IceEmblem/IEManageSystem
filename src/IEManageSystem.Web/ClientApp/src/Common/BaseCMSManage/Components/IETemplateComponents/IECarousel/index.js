import BaseComponentObject from '../../BaseComponents/BaseContentLeafComponent'
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import IPreview from './IPreview'
import IDataConfig from './IDataConfig'
import ISettingConfig from './ISettingConfig'

class ComponentObject extends BaseComponentObject {
    ComponentSettingConfigs = [
        IocContainer.getService(ISettingConfig)
    ];
    ComponentDataConfig = IocContainer.getService(IDataConfig);
    Component=IocContainer.getService(IComponent);
    Preview=IocContainer.getService(IPreview);
}

const componentDescribeBuilder = () => {
    let componentDescribe = new ComponentDescribe("IECarousel", new ComponentObject(), componentType.text, "IE走马灯")
    componentDescribe.defauleStyle = {
        backgroundColor: "#364d79"
    }

    return componentDescribe;
}

export default componentDescribeBuilder;