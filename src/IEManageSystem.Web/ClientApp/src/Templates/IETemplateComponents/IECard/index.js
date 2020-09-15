import BaseComponentObject from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import ComponentDataConfig from 'BaseCMSManage/Components/BaseComponents/BaseContentLeafComponent/ComponentDataConfig'
import ComponentDescribe, { componentType } from 'BaseCMSManage/Components/ComponentDescribe'
import ContainerConfig from 'BaseCMSManage/Components/BaseComponents/BaseContainerComponent/ContainerConfig'

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new ContainerConfig([
                { name: 'top', displayName: '头部' },
                { name: 'middle', displayName: '中间' },
                { name: 'bottom', displayName: '尾部' }
            ]),
        ];
        this.ComponentDataConfig = new ComponentDataConfig(dataConfig);
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) =>
    new ComponentDescribe("IECard", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.other, "IE卡片");
export default componentDescribeBuilder;