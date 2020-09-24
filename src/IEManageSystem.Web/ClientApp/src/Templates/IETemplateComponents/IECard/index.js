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

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) => {
    let componentDescribe = new ComponentDescribe("IECard", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.other, "IE卡片")
    componentDescribe.paste = (pastePageComponent, curPageComponent, curPageComponentChilds) => {
        if(curPageComponentChilds.some(e=>e.group == 'bottom')){
            return {message: "尾部以存在组件, 无法粘贴", isPass: false}
        }

        pastePageComponent.group = 'bottom'

        return {message: "", isPass: true}
    };

    return componentDescribe;

}
export default componentDescribeBuilder;