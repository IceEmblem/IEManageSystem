import BaseComponentObject, { CommonStyleSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import ComponentDescribe, { componentType } from 'BaseCMSManage/Components/ComponentDescribe';
import ContainerConfig from 'BaseCMSManage/Components/BaseComponents/BaseContainerComponent/ContainerConfig';

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new CommonStyleSettingConfig(),
            new ContainerConfig(),
        ];
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) => {
    let componentDescribe = new ComponentDescribe("IEScrollbar", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.container, "IE滚动条");
    componentDescribe.paste = (pastePageComponent, curPageComponent, curPageComponentChilds) => ({message: "", isPass: true});
    return componentDescribe;
}
    
export default componentDescribeBuilder;