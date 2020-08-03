import React from 'react'
import BaseComponentObject from '../../BaseComponents/BaseContentLeafComponent'
import Text from './Text'
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

import {ComponentSettingConfig} from '../../BaseComponents/BaseComponent';
import SettingConfig from './SettingConfig'
import DataConfig from './DataConfig'

class ComponentObject extends BaseComponentObject {
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
    ComponentDataConfig = DataConfig;
    Component=Text;
    Preview=<p>文本框</p>;
}

let componentDescribe = new ComponentDescribe("Text", new ComponentObject(), componentType.text, "文本框");
export default componentDescribe;