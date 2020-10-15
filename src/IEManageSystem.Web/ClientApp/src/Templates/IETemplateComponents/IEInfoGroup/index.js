import BaseComponentObject, { ComponentSettingConfig } from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import ComponentDataConfig from 'BaseCMSManage/Components/BaseComponents/BaseContentLeafComponent/ComponentDataConfig'
import ComponentDescribe, { componentType } from 'BaseCMSManage/Components/ComponentDescribe'
import InteractiveContainerConfig from 'BaseCMSManage/Components/BaseComponents/InteractiveComponent/InteractiveContainerConfig'

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new InteractiveContainerConfig([
                {
                    name: 'title', displayName: '标题组件'
                },
                {
                    name: 'item', displayName: '列表项组件'
                },
            ]),
            new ComponentSettingConfig(undefined, "字段配置", settingConfig),
        ];
        this.ComponentDataConfig = new ComponentDataConfig(dataConfig)
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) =>
    new ComponentDescribe("IEInfoGroup", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.text, "IE信息组");
export default componentDescribeBuilder;