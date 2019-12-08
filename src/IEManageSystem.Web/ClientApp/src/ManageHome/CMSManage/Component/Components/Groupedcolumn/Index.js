import React from 'react'
import BaseComponentObject, { BaseField, LeafComponent, BasePreview, ComponentSettingConfig } from '../BaseLeafComponent'
import Groupedcolumn from './Groupedcolumn'
import CustomizeField from './CustomizeField'

const CustomizeComponentDataConCfigField = 
    (name) => 
    (props) => 
    <CustomizeField text={name} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;

export default class ComponentObject extends BaseComponentObject {
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
                (props) => {
                    // props.pageComponentSetting
                    // props.setPageComponentSetting
                    return (<div>
                        <BaseField
                            text="柱1名称"
                            fieldValue={props.pageComponentSetting.field1}
                            setFieldValue={(value) => {
                                props.setPageComponentSetting({ ...props.pageComponentSetting, ...{ field1: value } })
                            }} />
                        <BaseField
                            text="柱2名称"
                            fieldValue={props.pageComponentSetting.field2}
                            setFieldValue={(value) => {
                                props.setPageComponentSetting({ ...props.pageComponentSetting, ...{ field2: value } })
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