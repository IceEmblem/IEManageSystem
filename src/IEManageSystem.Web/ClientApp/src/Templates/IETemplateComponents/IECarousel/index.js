import BaseComponentObject, {ComponentSettingConfig} from 'BaseCMSManage/Components/BaseComponents/BaseComponent'
import ComponentDataConfig from 'BaseCMSManage/Components/BaseComponents/BaseContentLeafComponent/ComponentDataConfig'
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'
import InteractiveContainerConfig from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractiveContainerConfig'
import ContainerConfig from 'BaseCMSManage/Components/BaseComponents/BaseContainerComponent/ContainerConfig'

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new ContainerConfig(),
            new ComponentSettingConfig(undefined, "幻灯片设置", settingConfig),
        ];
        this.ComponentDataConfig = new ComponentDataConfig(dataConfig);
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) => {
    let componentDescribe = new ComponentDescribe("IECarousel", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.text, "IE走马灯")

    componentDescribe.paste = (pastePageComponent, curPageComponent, curPageComponentChilds) => ({message: "", isPass: true});

    return componentDescribe;
}

export default componentDescribeBuilder;