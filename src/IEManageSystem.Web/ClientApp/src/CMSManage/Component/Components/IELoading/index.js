import React from 'react'
import BaseComponentObject from '../BaseStaticComponent';
import { BaseField, DefaultSettingConfig, ComponentSettingConfig } from '../BaseComponent';
import IELoading from './IELoading'
import ComponentDescribe, {componentType} from '../ComponentDescribe'

const field1 = (props)=>(<BaseField text={"宽（px）"} {...props} />);
const field2 = (props)=>(<BaseField text={"高（px）"} {...props} />);

class ComponentObject extends BaseComponentObject {
    constructor(){
        super();
        this.ComponentSettingConfigs = [
            ComponentSettingConfig.BuildPageComponentSettingConfig(
                "SizeSetting",
                "大小设置",
                (pageComponentSetting, setPageComponentSetting) => {
                    return <DefaultSettingConfig
                        data={pageComponentSetting}
                        setData={setPageComponentSetting}
                        field1={field1}
                        field2={field2}
                    />;
                }
            )
        ]
    }
    Component(props) {
        return <IELoading {...props} />
    }
    Preview() {
        return <p>彩色Loading动画</p>;
    }
}

let componentDescribe = new ComponentDescribe("IELoading", new ComponentObject(), componentType.other);
export default componentDescribe;