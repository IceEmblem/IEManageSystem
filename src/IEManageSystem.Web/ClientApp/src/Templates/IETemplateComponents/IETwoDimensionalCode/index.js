import BaseComponentObject, { CommonStyleSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import ComponentDescribe, { componentType } from 'BaseCMSManage/Components/ComponentDescribe';
import ContainerConfig from 'BaseCMSManage/Components/BaseComponents/BaseContainerComponent/ContainerConfig';

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new ContainerConfig(1),
            new CommonStyleSettingConfig()
        ];
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) =>
    new ComponentDescribe("IETwoDimensionalCode", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.other, "IE二维码");
export default componentDescribeBuilder;