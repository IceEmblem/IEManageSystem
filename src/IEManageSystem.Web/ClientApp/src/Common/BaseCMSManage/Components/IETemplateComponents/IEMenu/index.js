import BaseComponentObject from '../../BaseComponents/BaseComponent';
import MenuComponentSettingConfig from '../../BaseComponents/BaseMenuComponent/MenuComponentSettingConfig'
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import IPreview from './IPreview'

class ComponentObject extends BaseComponentObject{
    ComponentSettingConfigs = [
        new MenuComponentSettingConfig()
    ]
    Component=IocContainer.getService(IComponent)
    Preview=IocContainer.getService(IPreview)
}

const componentDescribeBuilder = () => new ComponentDescribe("IEMenu", new ComponentObject(), componentType.menu, "IE菜单");
export default componentDescribeBuilder;