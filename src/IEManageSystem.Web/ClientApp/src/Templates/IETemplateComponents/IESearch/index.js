import BaseComponentObject, { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import ComponentDescribe, { componentType } from 'BaseCMSManage/Components/ComponentDescribe'

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new ComponentSettingConfig(undefined, "组件设置", settingConfig),
        ];
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) =>
    new ComponentDescribe("IESearch", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.other, "IE搜索框");
export default componentDescribeBuilder;