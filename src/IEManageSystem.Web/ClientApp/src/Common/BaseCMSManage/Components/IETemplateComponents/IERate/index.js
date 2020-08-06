import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import IPreview from './IPreview'

class ComponentObject extends BaseComponentObject{
    Component=IocContainer.getService(IComponent)
    Preview=IocContainer.getService(IPreview)
}

const componentDescribeBuilder = () => new ComponentDescribe("IERate", new ComponentObject(), componentType.other, "IE文章评分");
export default componentDescribeBuilder;