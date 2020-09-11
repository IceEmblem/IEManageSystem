import BaseComponentObject from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import PageLeafComponentSettingConfig from 'BaseCMSManage/Components/BaseComponents/BasePageLeafComponent/PageLeafComponentSettingConfig'
import ComponentDescribe, { componentType } from 'BaseCMSManage/Components/ComponentDescribe'

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new PageLeafComponentSettingConfig()
        ];
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) =>
    new ComponentDescribe("IERankingList", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.page, "IE排行榜");
export default componentDescribeBuilder;