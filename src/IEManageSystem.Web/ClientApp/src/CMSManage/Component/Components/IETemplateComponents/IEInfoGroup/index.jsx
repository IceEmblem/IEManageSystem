import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseContentLeafComponent';
import IEInfoGroup from './IEInfoGroup';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import ComponentSettingConfig from '../../BaseComponents/BaseComponent/ComponentSettingConfig';
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
    Component(props){
        return <IEInfoGroup {...props} />
    }
    Preview() {
        return <p>IE-信息组</p>
    };
}

let componentDescribe = new ComponentDescribe("IEInfoGroup", new ComponentObject(), componentType.text, "IE信息组");
export default componentDescribe;