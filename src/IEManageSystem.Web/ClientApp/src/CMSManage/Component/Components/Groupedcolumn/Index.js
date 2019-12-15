import React from 'react'
import BaseComponentObject, { BaseField, BaseContentLeafComponent, BasePreview, ComponentSettingConfig } from '../BaseContentLeafComponent'
import Groupedcolumn from './Groupedcolumn'
import CustomizeField from './CustomizeField'
import ComponentDescribe, {componentType} from '../ComponentDescribe'

const CustomizeComponentDataConCfigField = 
    (name) => 
    (props) => 
    <CustomizeField text={name} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;

class ComponentObject extends BaseComponentObject {
    constructor(){
        super();
        this.ComponentDataConfigs = {
            field1: CustomizeComponentDataConCfigField("数据1"),
            field2: CustomizeComponentDataConCfigField("数据2"),
            field3: CustomizeComponentDataConCfigField("数据3"),
            field4: CustomizeComponentDataConCfigField("数据4"),
            field5: CustomizeComponentDataConCfigField("数据5")
        }

        this.ComponentSettingConfigs = [
            new ComponentSettingConfig(
                "otherSetting",
                "柱状图配置",
                (pageComponentSetting, setPageComponentSetting) => {
                    return (<div>
                        <BaseField
                            text="柱1名称"
                            fieldValue={pageComponentSetting.field1}
                            setFieldValue={(value) => {
                                setPageComponentSetting({ ...pageComponentSetting, ...{ field1: value } })
                            }} />
                        <BaseField
                            text="柱2名称"
                            fieldValue={pageComponentSetting.field2}
                            setFieldValue={(value) => {
                                setPageComponentSetting({ ...pageComponentSetting, ...{ field2: value } })
                            }} />
                    </div>)
                }
            )
        ]
    }
    Component(props) {
        return <Groupedcolumn {...props} />
    }
    Preview() {
        return <p>柱状图</p>;
    }
}

let componentDescribe = new ComponentDescribe("Groupedcolumn", new ComponentObject(), componentType.graph);
export default componentDescribe;