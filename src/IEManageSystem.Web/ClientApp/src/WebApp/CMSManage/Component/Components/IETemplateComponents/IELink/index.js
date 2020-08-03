import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IELink from './IELink';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

import {ComponentSettingConfig} from '../../BaseComponents/BaseComponent';
import SettingConfig from './SettingConfig'

class ComponentObject extends BaseComponentObject{
    ComponentSettingConfigs = [
        ComponentSettingConfig.BuildPageComponentSettingConfig("Setting", "链接设置",
            (pageComponentSetting, setPageComponentSetting) => {
                return <SettingConfig
                    data={pageComponentSetting}
                    setData={setPageComponentSetting}
                />;
            }
        )
    ];
    Component=IELink;
    Preview=<p>IE-链接</p>;
}

let componentDescribe = new ComponentDescribe("IELink", new ComponentObject(), componentType.other, "IE链接");
export default componentDescribe;