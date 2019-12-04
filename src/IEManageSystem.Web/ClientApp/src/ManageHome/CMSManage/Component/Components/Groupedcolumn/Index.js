import React from 'react'
import BaseComponentObject, { BaseField, LeafComponent, BasePreview, ComponentSettingConfig } from '../BaseLeafComponent'
import Groupedcolumn from './Groupedcolumn'
import CustomizeField from './CustomizeField'

const ComponentObject = {
    ...BaseComponentObject,
    ... {
        Component: Groupedcolumn,
        Preview: (props) => (<p>柱状图</p>),
        ComponentSettingConfigs: [
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
        ],
        ComponentDataConfigs: {
            field1: (props) => <CustomizeField text={"数据1"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field2: (props) => <CustomizeField text={"数据2"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field3: (props) => <CustomizeField text={"数据3"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field4: (props) => <CustomizeField text={"数据4"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
            field5: (props) => <CustomizeField text={"数据5"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />
        }
    }
}

export default ComponentObject