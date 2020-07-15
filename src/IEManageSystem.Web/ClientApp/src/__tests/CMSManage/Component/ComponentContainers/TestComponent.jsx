import React from 'react'
import { BaseField, ComponentSettingConfig } from 'CMSManage/Component/Components/BaseComponents/BaseComponent';
import BaseComponentObject, { ComponentDataConfig } from 'CMSManage/Component/Components/BaseComponents/BaseContentLeafComponent'
import ComponentDescribe, { componentType } from 'CMSManage/Component/Components/ComponentDescribe';

const field1 = (props) => (<BaseField text={"文本"} {...props} />);

class ComponentObject extends BaseComponentObject {
    constructor() {
        super();
        this.ComponentDataConfig = (props) => (
            <ComponentDataConfig {...props}
                field1={field1}
            />);

        this.ComponentSettingConfigs = [
            ComponentSettingConfig.BuildPageComponentSettingConfig("setting1", "设置1",
                (pageComponentSetting, setPageComponentSetting) => {
                    return (<p>组件设置配置1</p>);
                }
            ),
            ComponentSettingConfig.BuildPageComponentSettingConfig("setting2", "设置2",
                (pageComponentSetting, setPageComponentSetting) => {
                    return (<p>组件设置配置2</p>);
                }
            )
        ];
    }
    Component(props) {
        return <p>{props.componentData.field1}</p>
    }
    Preview() {
        return <p>文本框</p>;
    }
}

let componentDescribe = new ComponentDescribe("Test", new ComponentObject(), componentType.text);
export default componentDescribe;