import BaseComponentObject from '../../BaseComponents/BaseContentLeafComponent';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import IPreview from './IPreview'
import IDataConfig from './IDataConfig'

class ComponentObject extends BaseComponentObject{
    ComponentDataConfig = IocContainer.getService(IDataConfig);
    Component=IocContainer.getService(IComponent);
    Preview=IocContainer.getService(IPreview);
}

const componentDescribeBuilder = () => new ComponentDescribe("IECard", new ComponentObject(), componentType.other, "IE卡片");
export default componentDescribeBuilder;