import React from 'react'
import BaseComponentObject from '../../BaseComponents/BaseContentLeafComponent'
import IECarousel from './IECarousel'
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

import {ComponentSettingConfig} from '../../BaseComponents/BaseComponent';
import SettingConfig from './SettingConfig'
import DataConfig from './DataConfig'

class ComponentObject extends BaseComponentObject {
    ComponentSettingConfigs = [
        ComponentSettingConfig.BuildPageComponentSettingConfig("DefaultSetting", "幻灯片设置",
            (pageComponentSetting, setPageComponentSetting) => {
                return <SettingConfig
                    data={pageComponentSetting}
                    setData={setPageComponentSetting}
                />;
            }
        )
    ];
    ComponentDataConfig = DataConfig;
    Component=IECarousel;
    Preview=<p>IE-走马灯</p>
}

let componentDescribe = new ComponentDescribe("IECarousel", new ComponentObject(), componentType.text, "IE走马灯");
componentDescribe.defauleStyle = {
    backgroundColor: "#364d79"
}
export default componentDescribe;