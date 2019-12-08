export default class ComponentSettingConfig {
    constructor(name, displayName, fieldBuilder) {
        this.name = name;
        this.displayName = displayName;
        // fieldBuilder = (fieldName: string, pageComponentSetting: any, setPageComponentSetting: any) => ReactNode
        this.fieldBuilder = fieldBuilder;
    }
}