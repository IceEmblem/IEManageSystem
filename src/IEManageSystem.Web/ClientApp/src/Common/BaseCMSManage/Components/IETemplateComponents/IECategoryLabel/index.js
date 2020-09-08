import BaseComponentObject, {ComponentSettingConfig} from '../../BaseComponents/BaseComponent';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'
import InteractiveContainerConfig from '../../BaseComponents/InteractiveComponent/InteractiveContainerConfig'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import IPreview from './IPreview'
import ISettingConfig from './ISettingConfig'

class ComponentObject extends BaseComponentObject{
    ComponentSettingConfigs = [
        new InteractiveContainerConfig([
            {name: 'unselect', displayName: '未选中组件'},
            {name: 'selected', displayName: '选中组件'}
        ]),
        new ComponentSettingConfig(undefined, "标签设置", IocContainer.getService(ISettingConfig))
    ];
    Component=IocContainer.getService(IComponent)
    Preview=IocContainer.getService(IPreview)
}

const componentDescribeBuilder = () => new ComponentDescribe("IECategoryLabel", new ComponentObject(), componentType.page, "IE分类标签");
export default componentDescribeBuilder;