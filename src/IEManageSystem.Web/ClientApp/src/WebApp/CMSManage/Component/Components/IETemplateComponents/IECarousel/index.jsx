import React from 'react'
import BaseComponentObject from '../../BaseComponents/BaseContentLeafComponent'
import IECarousel from './IECarousel'
import ComponentDescribe, {componentType} from '../../ComponentDescribe';

import ComponentSettingConfig from '../../BaseComponents/BaseComponent/ComponentSettingConfig';
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
    constructor(){
        super();
        this.ComponentDataConfig = DataConfig;
    }
    Component(props) {
        return <IECarousel {...props} />
    }
    Preview() {
        return <p>IE-走马灯</p>;
    }
}

let componentDescribe = new ComponentDescribe("IECarousel", new ComponentObject(), componentType.text, "IE走马灯");
componentDescribe.defauleStyle = {
    backgroundColor: "#364d79"
}
export default componentDescribe;