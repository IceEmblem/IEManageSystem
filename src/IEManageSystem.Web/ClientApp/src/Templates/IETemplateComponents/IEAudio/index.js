import BaseComponentObject, { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent'
import ComponentDataConfig from 'BaseCMSManage/Components/BaseComponents/BaseContentLeafComponent/ComponentDataConfig'
import ComponentDescribe, { componentType } from 'BaseCMSManage/Components/ComponentDescribe'
import InteractiveComponentConfig from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractiveComponentConfig'
import InteractiveType from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractiveType'

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new InteractiveComponentConfig([InteractiveType.url]),
        ];
        this.ComponentDataConfig = new ComponentDataConfig(dataConfig)
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) =>
    new ComponentDescribe("IEAudio", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.other, "IE音频");
export default componentDescribeBuilder;