import BaseComponentObject, { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import PageLeafComponentSettingConfig from 'BaseCMSManage/Components/BaseComponents/BasePageLeafComponent/PageLeafComponentSettingConfig'
import ComponentDescribe, { componentType } from 'BaseCMSManage/Components/ComponentDescribe'
import InteractiveContainerConfig from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractiveContainerConfig'

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new InteractiveContainerConfig([
                { name: 'head', displayName: '头部' },
                { name: 'listItem', displayName: '列表项' },
            ]),
            new PageLeafComponentSettingConfig(),
            new ComponentSettingConfig(undefined, "组件设置", settingConfig),
        ];
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) =>
    new ComponentDescribe("IEPostList", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.page, "IE文章列表");
export default componentDescribeBuilder;