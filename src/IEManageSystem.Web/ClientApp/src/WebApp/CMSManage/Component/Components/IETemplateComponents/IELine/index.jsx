import React from 'react'
import BaseComponentObject from '../../BaseComponents/BaseContentLeafComponent'
import IELine from './IELine'
import ComponentDescribe, {componentType} from '../../ComponentDescribe';

import ComponentSettingConfig from '../../BaseComponents/BaseComponent/ComponentSettingConfig';
import SettingConfig from './SettingConfig'
import DataConfig from './DataConfig'

import PreviewImg from './Preview.png'

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
        return <img width="100%" height="100%" src={PreviewImg} alt="IE-折线|柱状|条形"/>;
    }
}

let componentDescribe = new ComponentDescribe("IELine", new ComponentObject(), componentType.graph, "IE-折线|柱状|条形");
componentDescribe.defauleStyle = {
    height: "400px"
}

export default componentDescribe;