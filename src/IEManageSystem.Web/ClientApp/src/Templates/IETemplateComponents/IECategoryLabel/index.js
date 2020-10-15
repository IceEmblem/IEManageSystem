import BaseComponentObject, { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import ComponentDescribe, { componentType } from 'BaseCMSManage/Components/ComponentDescribe'
import InteractiveContainerConfig from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractiveContainerConfig'

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new InteractiveContainerConfig([
                { name: 'unselect', displayName: '未选中组件' },
                { name: 'selected', displayName: '选中组件' }
            ]),
            new ComponentSettingConfig(undefined, "标签设置", settingConfig),
        ];
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) =>
    new ComponentDescribe("IECategoryLabel", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.page, "IE分类标签");
export default componentDescribeBuilder;