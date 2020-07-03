import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IELink from './IELink';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import ComponentSettingConfig from '../../BaseComponents/BaseComponent/ComponentSettingConfig';
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
    Component(props){
        return <IELink {...props} />
    }
    Preview() {
        return <p>IE-链接</p>
    };
}

let componentDescribe = new ComponentDescribe("IELink", new ComponentObject(), componentType.other, "IE链接");
export default componentDescribe;