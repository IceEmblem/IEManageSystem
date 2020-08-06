import BaseComponentObject from '../../BaseComponents/BaseMenuComponent';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import IPreview from './IPreview'

class ComponentObject extends BaseComponentObject{
    Component=IocContainer.getService(IComponent)
    Preview=IocContainer.getService(IPreview)
}

const componentDescribeBuilder = () => new ComponentDescribe("IEMenu", new ComponentObject(), componentType.menu, "IE菜单");
export default componentDescribeBuilder;