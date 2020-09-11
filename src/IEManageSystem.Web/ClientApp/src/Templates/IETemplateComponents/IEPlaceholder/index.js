import BaseComponentObject from 'BaseCMSManage/Components/BaseComponents/BaseComponent';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

class ComponentObject extends BaseComponentObject{
    constructor(component, preview, settingConfig, dataConfig) {
        super();
        this.Component = component;
        this.Preview = preview;
    }
}

const componentDescribeBuilder = (component, preview, settingConfig, dataConfig) => {
    let componentDescribe = new ComponentDescribe("IEPlaceholder", new ComponentObject(component, preview, settingConfig, dataConfig), componentType.other, 'IE占位组件');
    componentDescribe.defauleStyle = {
        height: 10
    }

    return componentDescribe;
}
export default componentDescribeBuilder;