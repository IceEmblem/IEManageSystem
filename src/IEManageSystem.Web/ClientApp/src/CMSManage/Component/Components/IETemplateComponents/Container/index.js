import React from 'react'
import BaseComponentObject from '../../BaseComponents/BaseContainerComponent'
import Container from './Container'
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import ComponentSettingConfig from '../../BaseComponents/BaseComponent/ComponentSettingConfig';
import SettingConfig from './SettingConfig'

class ComponentObject extends BaseComponentObject {
    ComponentSettingConfigs = [
        ComponentSettingConfig.BuildPageComponentSettingConfig("FlexSetting", "内容对齐设置",
            (pageComponentSetting, setPageComponentSetting) => {
                return <SettingConfig
                    data={pageComponentSetting}
                    setData={setPageComponentSetting}
                />;
            }
        )
    ];
    Component(props, childrens) {
        return <Container {...props} >{childrens}</Container>
    }
    Preview() {
        return <p>容器组件</p>;
    }
}

let componentDescribe = new ComponentDescribe("Container", new ComponentObject(), componentType.container, "组件容器");
// componentDescribe.defauleStyle.height = "50px";
export default componentDescribe;