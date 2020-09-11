import BaseComponentObject from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import ComponentDataConfig from 'BaseCMSManage/Components/BaseComponents/BaseContentLeafComponent/ComponentDataConfig'
import ComponentDescribe, { componentType } from 'BaseCMSManage/Components/ComponentDescribe'
import ContainerConfig from 'BaseCMSManage/Components/BaseComponents/BaseContainerComponent/ContainerConfig'
import InteractiveComponentConfig from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractiveComponentConfig'
import ComponentSettingConfig from 'BaseCMSManage/Components/BaseComponents/BaseComponent/ComponentSettingConfig'

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new InteractiveComponentConfig(),
            new ContainerConfig(1),
            new ComponentSettingConfig(undefined, "图片配置", settingConfig),
        ];
        this.ComponentDataConfig = new ComponentDataConfig(dataConfig)
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) =>
    new ComponentDescribe("IEImg", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.other, "IE图片");
export default componentDescribeBuilder;