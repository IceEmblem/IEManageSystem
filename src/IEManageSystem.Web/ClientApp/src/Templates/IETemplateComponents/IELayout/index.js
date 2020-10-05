import BaseComponentObject from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import ComponentDescribe, { componentType } from 'BaseCMSManage/Components/ComponentDescribe'
import ContainerConfig from 'BaseCMSManage/Components/BaseComponents/BaseContainerComponent/ContainerConfig'

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.ComponentSettingConfigs = [
            new ContainerConfig([
                { name: 'top', displayName: '头部', list: true },
                { name: 'middle', displayName: '中间', list: true },
                { name: 'bottom', displayName: '尾部', list: true }
            ]),
        ];
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) => {
    let componentDescribe = new ComponentDescribe("IELayout", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.container, "IEApp框架")
    componentDescribe.defauleStyle = {
        width: "100%",
        height: "100%",
    }

    componentDescribe.paste = (pastePageComponent, curPageComponent, curPageComponentChilds) => {
        pastePageComponent.group = "middle";
        return {message: "", isPass: true}
    };

    return componentDescribe;

}
export default componentDescribeBuilder;