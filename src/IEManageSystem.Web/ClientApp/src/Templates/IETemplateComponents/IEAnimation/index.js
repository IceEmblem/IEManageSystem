import BaseComponentObject, {ComponentSettingConfig} from 'BaseCMSManage/Components/BaseComponents/BaseComponent'
import ContainerConfig from  'BaseCMSManage/Components/BaseComponents/BaseContainerComponent/ContainerConfig'
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new ContainerConfig(),
            new ComponentSettingConfig(undefined, "动画设置", settingConfig),
        ];
        this.Component=component;
        this.Preview=preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) => {
    let componentDescribe = new ComponentDescribe("IEAnimation", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.container, "IE动画组件");

    componentDescribe.paste = (pastePageComponent, curPageComponent, curPageComponentChilds) => ({message: "", isPass: true});

    return componentDescribe;
}
export default componentDescribeBuilder;