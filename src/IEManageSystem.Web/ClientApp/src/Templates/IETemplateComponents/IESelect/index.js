import BaseComponentObject, {ComponentSettingConfig} from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new ComponentSettingConfig("Select", "数据配置", settingConfig),
        ];
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) => 
    new ComponentDescribe("IESelect", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.other, "IE选择框");
export default componentDescribeBuilder;