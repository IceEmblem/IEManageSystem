import React from 'react'
import BaseComponentObject from '../../BaseComponents/BaseContentLeafComponent'
import IELine from './IELine'
import ComponentDescribe, {componentType} from '../../ComponentDescribe';

import ComponentSettingConfig from '../../BaseComponents/BaseComponent/ComponentSettingConfig';
import SettingConfig from './SettingConfig'
import DataConfig from './DataConfig'

class ComponentObject extends BaseComponentObject {
    ComponentSettingConfigs = [
        ComponentSettingConfig.BuildPageComponentSettingConfig("DefaultSetting", "图表设置",
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
        return <IELine {...props} />
    }
    Preview() {
        return <p>IE-折线图</p>;
    }
}

let componentDescribe = new ComponentDescribe("IELine", new ComponentObject(), componentType.graph, "IE折线图");
componentDescribe.defauleStyle = {
    height: "400px"
}

export default componentDescribe;