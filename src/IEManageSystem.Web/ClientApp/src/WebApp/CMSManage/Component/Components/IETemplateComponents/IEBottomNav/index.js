import React from 'react';
import IEBottomNav from './IEBottomNav'
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

import {ComponentSettingConfig} from '../../BaseComponents/BaseComponent';
import SettingConfig from './SettingConfig'

class ComponentObject extends BaseComponentObject{
    ComponentSettingConfigs = [
        ComponentSettingConfig.BuildPageComponentSettingConfig("Setting", "文本设置",
            (pageComponentSetting, setPageComponentSetting) => {
                return <SettingConfig
                    data={pageComponentSetting}
                    setData={setPageComponentSetting}
                />;
            }
        )
    ];
    Component=IEBottomNav;
    Preview=<p>IE-底部导航栏</p>
}

const componentDescribe = new ComponentDescribe("IEBottomNav", new ComponentObject(), componentType.nav, "IE底部导航栏");
export default componentDescribe;