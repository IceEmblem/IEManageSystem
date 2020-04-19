import React from 'react';
import BaseComponentObject from '../BaseStaticComponent';
import { ComponentSettingConfig, DefaultSettingConfig } from '../BaseComponent';
import CitiesSlider from './CitiesSlider.jsx';
import ComponentDescribe, { componentType } from '../ComponentDescribe';

import CustomizeField from './CustomizeField';

const field1 = (props)=>(<CustomizeField text={"幻灯片1"} {...props} />);
const field2 = (props)=>(<CustomizeField text={"幻灯片2"} {...props} />);
const field3 = (props)=>(<CustomizeField text={"幻灯片3"} {...props} />);

class ComponentObject extends BaseComponentObject {
    constructor() {
        super();

        this.ComponentSettingConfigs = [ComponentSettingConfig.BuildPageComponentSettingConfig("pic", "幻灯片设置",
            (pageComponentSetting, setPageComponentSetting) => {
                return (<DefaultSettingConfig 
                    data={pageComponentSetting}
                    setData={setPageComponentSetting}
                    field1={field1}
                    field2={field2}
                    field3={field3}
                />);
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