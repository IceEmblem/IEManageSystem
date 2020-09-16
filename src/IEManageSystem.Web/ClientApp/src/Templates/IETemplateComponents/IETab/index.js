import BaseComponentObject, { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import ComponentDescribe, { componentType } from 'BaseCMSManage/Components/ComponentDescribe'
import ContainerConfig from 'BaseCMSManage/Components/BaseComponents/BaseContainerComponent/ContainerConfig'

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new ContainerConfig([
                { name: 'tab', displayName: '标签项' },
                { name: 'content', displayName: '标签内容' },
            ]),
        ];
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) =>
    new ComponentDescribe("IETab", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.container, "IE标签");
export default componentDescribeBuilder;