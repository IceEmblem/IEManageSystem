import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';
import IECategoryLabel from './IECategoryLabel';
import ComponentDescribe, {componentType} from '../../ComponentDescribe'

import ComponentSettingConfig from '../../BaseComponents/BaseComponent/ComponentSettingConfig';
import SettingConfig from './SettingConfig'

class ComponentObject extends BaseComponentObject{
    ComponentSettingConfigs = [
        ComponentSettingConfig.BuildPageComponentSettingConfig("DefaultSetting", "标签设置",
            (pageComponentSetting, setPageComponentSetting) => {
                return <SettingConfig
                    data={pageComponentSetting}
                    setData={setPageComponentSetting}
                />;
            }
        )
    ];
    Component(props){
        return <IECategoryLabel {...props} />
    }
    Preview() {
        return <p>IE-分类标签</p>
    };
}

let componentDescribe = new ComponentDescribe("IECategoryLabel", new ComponentObject(), componentType.page, "IE分类标签");
export default componentDescribe;