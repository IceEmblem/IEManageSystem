import React from 'react'
import { ComponentSettingConfig } from 'CMSManage/Component/Components/BaseComponents/BaseComponent';
import BaseComponentObject from 'CMSManage/Component/Components/BaseComponents/BaseContentLeafComponent'
import ComponentDescribe, { componentType } from 'CMSManage/Component/Components/ComponentDescribe';

class ComponentObject extends BaseComponentObject {
    constructor() {
        super();
        this.ComponentDataConfig = (props) => (<div></div>);

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

const componentDescribeBuilder = () => new ComponentDescribe("Test", new ComponentObject(), componentType.text);
export default componentDescribeBuilder;