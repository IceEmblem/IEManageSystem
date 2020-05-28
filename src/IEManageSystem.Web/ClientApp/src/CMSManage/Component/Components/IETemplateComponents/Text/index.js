import React from 'react'
import BaseComponentObject from '../../BaseComponents/BaseContentLeafComponent'
import Text from './Text'
import ComponentDescribe, {componentType} from '../../ComponentDescribe';

import ComponentSettingConfig from '../../BaseComponents/BaseComponent/ComponentSettingConfig';
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
    constructor(){
        super();
        this.ComponentDataConfig = DataConfig;
    }
    Component(props) {
        return <Text {...props} />
    }
    Preview() {
        return <p>文本框</p>;
    }
}

let componentDescribe = new ComponentDescribe("Text", new ComponentObject(), componentType.text);
export default componentDescribe;