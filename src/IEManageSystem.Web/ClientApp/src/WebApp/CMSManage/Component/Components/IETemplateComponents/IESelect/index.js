import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IESelect from './IESelect';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

import {ComponentSettingConfig} from '../../BaseComponents/BaseComponent';
import SettingConfig from './SettingConfig'

class ComponentObject extends BaseComponentObject{
    ComponentSettingConfigs = [
        ComponentSettingConfig.BuildPageComponentSettingConfig("Select", "数据配置",
            (pageComponentSetting, setPageComponentSetting) => {
                return <SettingConfig
                    data={pageComponentSetting}
                    setData={setPageComponentSetting}
                />;
            }
        )
    ];
    Component=IESelect;
    Preview=<p>IE-选择框</p>;
}

let componentDescribe = new ComponentDescribe("IESelect", new ComponentObject(), componentType.other, "IE选择框");
export default componentDescribe;