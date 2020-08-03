import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseContentLeafComponent';
import IEInfoGroup from './IEInfoGroup';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

import {ComponentSettingConfig} from '../../BaseComponents/BaseComponent';
import SettingConfig from './SettingConfig'

import DataConfig from './DataConfig'

class ComponentObject extends BaseComponentObject{
    ComponentSettingConfigs = [
        ComponentSettingConfig.BuildPageComponentSettingConfig("DefaultSetting", "字段配置",
            (pageComponentSetting, setPageComponentSetting) => {
                return <SettingConfig
                    data={pageComponentSetting}
                    setData={setPageComponentSetting}
                />;
            }
        )
    ];
    ComponentDataConfig = DataConfig;
    Component=IEInfoGroup;
    Preview=<p>IE-信息组</p>;
}

let componentDescribe = new ComponentDescribe("IEInfoGroup", new ComponentObject(), componentType.text, "IE信息组");
export default componentDescribe;