import BaseComponentObject, { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent'
import ComponentDataConfig from 'BaseCMSManage/Components/BaseComponents/BaseContentLeafComponent/ComponentDataConfig'
import ContainerConfig from 'BaseCMSManage/Components/BaseComponents/BaseContainerComponent/ContainerConfig'
import ComponentDescribe, { componentType } from 'BaseCMSManage/Components/ComponentDescribe'
import InteractiveComponentConfig from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractiveComponentConfig'
import InteractiveType from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractiveType'

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new InteractiveComponentConfig([InteractiveType.url]),
            new ComponentSettingConfig(undefined, '视频设置', settingConfig)
        ];
        this.ComponentDataConfig = new ComponentDataConfig(dataConfig)
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) =>
    new ComponentDescribe("IEVideo", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.other, "IE视频");
export default componentDescribeBuilder;