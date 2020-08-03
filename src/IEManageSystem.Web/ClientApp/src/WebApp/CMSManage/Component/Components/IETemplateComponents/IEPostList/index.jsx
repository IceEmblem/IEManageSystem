import React from 'react';
import BaseComponentObject from '../../BaseComponents/BasePageLeafComponent';

import IEPostList from './IEPostList';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

import {ComponentSettingConfig} from '../../BaseComponents/BaseComponent';
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
    Component=IEPostList;
    Preview=<p>IE-文章列表</p>;
}

let componentDescribe = new ComponentDescribe("IEPostList", new ComponentObject(), componentType.page, "IE文章列表");
export default componentDescribe;