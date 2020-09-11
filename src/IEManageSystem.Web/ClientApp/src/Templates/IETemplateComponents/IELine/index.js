import BaseComponentObject, {ComponentSettingConfig} from 'BaseCMSManage/Components/BaseComponents/BaseComponent'
import ComponentDataConfig from 'BaseCMSManage/Components/BaseComponents/BaseContentLeafComponent/ComponentDataConfig'
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new ComponentSettingConfig(undefined, "图表设置", settingConfig),
        ];
        this.ComponentDataConfig = new ComponentDataConfig(dataConfig)
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) => {
    let componentDescribe = new ComponentDescribe("IELine", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.graph, "IE-折线|柱状|条形");
    componentDescribe.defauleStyle = {
        height: 250
    }
    return componentDescribe;
}
export default componentDescribeBuilder;