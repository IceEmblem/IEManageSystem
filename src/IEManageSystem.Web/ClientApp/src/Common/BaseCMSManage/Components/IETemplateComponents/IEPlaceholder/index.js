import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import IPreview from './IPreview'

class ComponentObject extends BaseComponentObject{
    Component=IocContainer.getService(IComponent)
    Preview=IocContainer.getService(IPreview)
}

const componentDescribeBuilder = () => {
    let componentDescribe = new ComponentDescribe("IEPlaceholder", new ComponentObject(), componentType.other, 'IE占位组件');
    componentDescribe.defauleStyle = {
        height: 10
    }

    return componentDescribe;
}
export default componentDescribeBuilder;