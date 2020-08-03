import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IEButton from './IEButton';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

import {ComponentSettingConfig} from '../../BaseComponents/BaseComponent';
import IEButtonSettingConfig from './IEButtonSettingConfig'

class ComponentObject extends BaseComponentObject {
    ComponentSettingConfigs = [
        ComponentSettingConfig.BuildPageComponentSettingConfig("BtnSetting", "按钮设置",
            (pageComponentSetting, setPageComponentSetting) => {
                return <IEButtonSettingConfig
                    data={pageComponentSetting}
                    setData={setPageComponentSetting}
                />;
            }
        )
    ];
    Component=IEButton;
    Preview=<p>IE-按钮</p>
}

let componentDescribe = new ComponentDescribe("IEButton", new ComponentObject(), componentType.other, "IE按钮");
export default componentDescribe;