import React from 'react'
import BaseComponentObject, { BaseField, ComponentSettingConfig } from '../BaseStaticComponent'
import CitiesSlider from './CitiesSlider.jsx';
import ComponentDescribe, { componentType } from '../ComponentDescribe';

import CustomizeField from './CustomizeField';

class ComponentObject extends BaseComponentObject {
    constructor() {
        super();

        this.ComponentSettingConfigs = [new ComponentSettingConfig("pic", "幻灯片设置",
            (pageComponentSetting, setPageComponentSetting) => {
                return (<div>
                    <CustomizeField
                        text={"幻灯片1"}
                        fieldValue={pageComponentSetting.field1}
                        setFieldValue={(value) => { setPageComponentSetting({ ...pageComponentSetting, ...{ field1: value } }) }} />
                    <CustomizeField
                        text={"幻灯片2"}
                        fieldValue={pageComponentSetting.field2}
                        setFieldValue={(value) => { setPageComponentSetting({ ...pageComponentSetting, ...{ field2: value } }) }} />
                    <CustomizeField
                        text={"幻灯片3"}
                        fieldValue={pageComponentSetting.field3}
                        setFieldValue={(value) => { setPageComponentSetting({ ...pageComponentSetting, ...{ field3: value } }) }} />
                </div>);
            }
        )];
    }
    Component(props) {
        return <CitiesSlider {...props} />
    }
    Preview() {
        return <p>幻灯片</p>;
    }
}

let componentDescribe = new ComponentDescribe("CitiesSlider", new ComponentObject(), componentType.other);
export default componentDescribe;