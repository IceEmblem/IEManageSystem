import BaseComponentObject, { ComponentSettingConfig, CommonStyleSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import ComponentDescribe, { componentType } from 'BaseCMSManage/Components/ComponentDescribe'
import InteractiveComponentConfig from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractiveComponentConfig'
import InteractiveType from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractiveType'


class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new InteractiveComponentConfig([InteractiveType.text(), InteractiveType.click()]),
            new ComponentSettingConfig("BtnSetting", "按钮设置", settingConfig),
            new CommonStyleSettingConfig(),
        ];
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) =>
    new ComponentDescribe("IEButton", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.other, "IE按钮");
export default componentDescribeBuilder;