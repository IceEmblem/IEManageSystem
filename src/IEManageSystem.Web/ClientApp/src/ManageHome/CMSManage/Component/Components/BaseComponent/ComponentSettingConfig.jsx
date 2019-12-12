export default class ComponentSettingConfig {
    constructor(name, displayName, settingComponentBuilder) {
        this.name = name;
        this.displayName = displayName;
        // settingComponentBuilder = (pageComponentSetting: any, setPageComponentSetting: any) => ReactNode
        this.settingComponentBuilder = settingComponentBuilder;
    }
}