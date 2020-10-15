import BaseComponentObject from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import ComponentDescribe, { componentType } from 'BaseCMSManage/Components/ComponentDescribe'

class ComponentObject extends BaseComponentObject {
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) =>
    new ComponentDescribe("IECalendar", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.other);
export default componentDescribeBuilder;