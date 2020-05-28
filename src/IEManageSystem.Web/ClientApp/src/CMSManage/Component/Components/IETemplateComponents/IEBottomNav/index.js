import React from 'react';
import IEBottomNav from './IEBottomNav'
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import ComponentSettingConfig from '../../BaseComponents/BaseComponent/ComponentSettingConfig';
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
    Component(props){
        return <IEBottomNav {...props} />;
    }
    Preview() {
        return <p>IE-底部导航栏</p>
    };
}

const componentDescribe = new ComponentDescribe("IEBottomNav", new ComponentObject(), componentType.nav);
export default componentDescribe;