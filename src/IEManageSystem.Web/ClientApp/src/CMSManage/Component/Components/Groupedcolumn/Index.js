import React from 'react';
import BaseComponentObject, { ComponentDataConfig } from '../BaseContentLeafComponent';
import { BaseField, DefaultSettingConfig, ComponentSettingConfig } from '../BaseComponent';
import Groupedcolumn from './Groupedcolumn'
import CustomizeField from './CustomizeField'
import ComponentDescribe, { componentType } from '../ComponentDescribe'

const dataField1 = (props) => <CustomizeField text={"字段1"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;
const dataField2 = (props) => <CustomizeField text={"字段2"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;
const dataField3 = (props) => <CustomizeField text={"字段3"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;
const dataField4 = (props) => <CustomizeField text={"字段4"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;
const dataField5 = (props) => <CustomizeField text={"字段5"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />;

const settingField1 = (props) => (<BaseField text={"柱1名称"} {...props} />);
const settingField2 = (props) => (<BaseField text={"柱2名称"} {...props} />);

class ComponentObject extends BaseComponentObject {
    constructor() {
        super();
        this.ComponentDataConfig = (props) => (
            <ComponentDataConfig {...props}
                field1={dataField1}
                field2={dataField2}
                field3={dataField3}
                field4={dataField4}
                field5={dataField5}
            />);

        this.ComponentSettingConfigs = [
            ComponentSettingConfig.BuildPageComponentSettingConfig(
                "otherSetting",
                "柱状图配置",
                (pageComponentSetting, setPageComponentSetting) => {
                    return <DefaultSettingConfig
                        data={pageComponentSetting}
                        setData={setPageComponentSetting}
                        field1={settingField1}
                        field2={settingField2}
                    />;
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