import React from 'react';
import BaseComponentObject from '../../BaseComponents/BasePageLeafComponent';

import IEPostList from './IEPostList';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import ComponentSettingConfig from '../../BaseComponents/BaseComponent/ComponentSettingConfig';
import SettingConfig from './SettingConfig'

class ComponentObject extends BaseComponentObject{
    ComponentSettingConfigs = [
        ComponentSettingConfig.BuildPageComponentSettingConfig("DefaultSetting", "组件设置",
            (pageComponentSetting, setPageComponentSetting) => {
                return <SettingConfig
                    data={pageComponentSetting}
                    setData={setPageComponentSetting}
                />;
            }
        )
    ];
    Component(props){
        return <IEPostList {...props} />
    }
    Preview() {
        return <p>IE-文章列表</p>
    };
}

let componentDescribe = new ComponentDescribe("IEPostList", new ComponentObject(), componentType.page, "IE文章列表");
export default componentDescribe;