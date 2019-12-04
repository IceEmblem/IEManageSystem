import BaseField from './BaseField.jsx'

export default class ComponentSettingConfig {
    constructor(name, displayName, component) {
        this.name = name || "otherSetting";
        this.displayName = displayName || "其他设置";
        this.component = component || ((props) => {
            // props.pageComponentSetting
            // props.setPageComponentSetting
            return (<div>
                <BaseField
                    text="配置1"
                    fieldValue={props.pageComponentSetting.field1}
                    setFieldValue={(value) => {
                        props.setPageComponentSetting({ ...props.pageComponentSetting, ...{ field1: value } })
                    }} />
            </div>)
        })
    }
}