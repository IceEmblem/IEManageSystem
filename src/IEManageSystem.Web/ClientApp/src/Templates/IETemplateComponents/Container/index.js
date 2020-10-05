import BaseComponentObject, {ComponentSettingConfig, CommonStyleSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent'
import ContainerConfig from  'BaseCMSManage/Components/BaseComponents/BaseContainerComponent/ContainerConfig'
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new ContainerConfig(),
            new ComponentSettingConfig("FlexSetting", "内容对齐设置", settingConfig),
            new CommonStyleSettingConfig()
        ];
        this.Component=component;
        this.Preview=preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) => {
    let componentDescribe = new ComponentDescribe("Container", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.container, "组件容器");
    componentDescribe.pageComponentBaseSetting = {
        height: 100
    }

    componentDescribe.paste = (pastePageComponent, curPageComponent, curPageComponentChilds) => ({message: "", isPass: true});

    return componentDescribe;
}
export default componentDescribeBuilder;