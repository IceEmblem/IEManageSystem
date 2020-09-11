import BaseComponentObject, { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent'
import ComponentDataConfig from 'BaseCMSManage/Components/BaseComponents/BaseContentLeafComponent/ComponentDataConfig'
import ContainerConfig from 'BaseCMSManage/Components/BaseComponents/BaseContainerComponent/ContainerConfig'
import ComponentDescribe, { componentType } from 'BaseCMSManage/Components/ComponentDescribe'
import InteractiveComponentConfig, { InteractiveType } from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractiveComponentConfig'

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new InteractiveComponentConfig([InteractiveType.text]),
            new ContainerConfig(1),
            new ComponentSettingConfig("Setting", "文本设置", settingConfig),
        ];
        this.ComponentDataConfig = new ComponentDataConfig(dataConfig)
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) =>
    new ComponentDescribe("Text", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.text, "文本框");
export default componentDescribeBuilder;