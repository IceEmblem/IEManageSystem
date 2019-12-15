import React from 'react'
import BaseComponentObject, { BaseField, BaseContentLeafComponent, BasePreview, ComponentSettingConfig } from '../BaseContentLeafComponent'
import IELoading from './IELoading'
import ComponentDescribe, {componentType} from '../ComponentDescribe'

class ComponentObject extends BaseComponentObject {
    constructor(){
        super();
        this.ComponentDataConfigs = {}
        this.ComponentSettingConfigs = [
            new ComponentSettingConfig("SizeSetting", "大小设置", (pageComponentSetting, setPageComponentSetting) => {
                return (<div>
                    <BaseField
                        text="宽（px）"
                        fieldValue={pageComponentSetting.field1}
                        setFieldValue={(value) => {
                            setPageComponentSetting({ ...pageComponentSetting, ...{ field1: value } })
                        }} />
                    <BaseField
                        text="高（px）"
                        fieldValue={pageComponentSetting.field2}
                        setFieldValue={(value) => {
                            setPageComponentSetting({ ...pageComponentSetting, ...{ field2: value } })
                        }} />
                </div>)}
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