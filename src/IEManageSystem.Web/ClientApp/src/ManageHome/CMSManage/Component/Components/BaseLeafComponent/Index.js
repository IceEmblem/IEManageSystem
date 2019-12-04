import LeafComponent from './BaseLeafComponent.jsx'
import BaseComponentObject, {BaseField, BasePreview, ComponentSettingConfig} from '../BaseComponent/Index';

const ComponentObject = {
    Component: LeafComponent,
    Preview: BaseComponentObject.Preview,
    ComponentSettingConfigs: BaseComponentObject.ComponentSettingConfigs,
    ComponentDataConfigs: {
        field1: (props) => <BaseField text={"字段1"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
        field2: (props) => <BaseField text={"字段2"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
        field3: (props) => <BaseField text={"字段3"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
        field4: (props) => <BaseField text={"字段4"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />,
        field5: (props) => <BaseField text={"字段5"} fieldValue={props.fieldValue} setFieldValue={props.setFieldValue} />
    }
}

export default ComponentObject

export { BaseField, LeafComponent, BasePreview, ComponentSettingConfig }