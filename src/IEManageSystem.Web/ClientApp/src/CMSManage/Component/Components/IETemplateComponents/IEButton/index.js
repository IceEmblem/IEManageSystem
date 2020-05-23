import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IEButton from './IEButton';
import ComponentDescribe, { componentType } from '../../ComponentDescribe'

import ComponentSettingConfig from '../../BaseComponents/BaseComponent/ComponentSettingConfig';
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
    Component(props) {
        return <IEButton {...props} />
    }
    Preview() {
        return <p>IE-按钮</p>
    };
}

let componentDescribe = new ComponentDescribe("IEButton", new ComponentObject(), componentType.other);
export default componentDescribe;