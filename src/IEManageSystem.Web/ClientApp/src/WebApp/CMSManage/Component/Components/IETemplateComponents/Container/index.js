import React from 'react'
import BaseComponentObject from '../../BaseComponents/BaseContainerComponent'
import Container from './Container'
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

import {ComponentSettingConfig} from '../../BaseComponents/BaseComponent';
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
    Component=Container;
    Preview=<p>容器组件</p>;
}

let componentDescribe = new ComponentDescribe("Container", new ComponentObject(), componentType.container, "组件容器");
// componentDescribe.defauleStyle.height = "50px";
export default componentDescribe;