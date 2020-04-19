export default class ComponentSettingConfig {
    static BuildBasicComponentSettingConfig(name, displayName, settingComponentBuilder){
        return new ComponentSettingConfig(name, displayName, settingComponentBuilder, 
            (pageComponent, name)=>{ 
                return pageComponent.pageComponentBaseSetting 
            },
            (pageComponent, name, setting)=>{ 
                pageComponent.pageComponentBaseSetting = setting 
            });
    }

    static BuildPageLeafComponentSettingConfig(name, displayName, settingComponentBuilder){
        return new ComponentSettingConfig(name, displayName, settingComponentBuilder, 
            (pageComponent, name)=>{ return pageComponent.targetPageId },
            (pageComponent, name, setting)=>{ pageComponent.targetPageId = setting });
    }

    static BuildPageComponentSettingConfig(name, displayName, settingComponentBuilder){
        return new ComponentSettingConfig(name, displayName, settingComponentBuilder, 
            (pageComponent, name)=>{ 
                let pageComponentSetting = pageComponent.pageComponentSettings.find(item => item.name == name);
                if(!pageComponentSetting){
                    pageComponentSetting = {
                        name: name,
                        displayName: displayName
                    };
                    pageComponent.pageComponentSettings.push(pageComponentSetting);
                }

                // 组件设置数据
                return pageComponentSetting;
            },
            (pageComponent, name, setting)=>{ 
                let pageComponentSetting = pageComponent.pageComponentSettings.find(item => item.name == name);
                pageComponentSetting.field1 = setting.field1
                pageComponentSetting.field2 = setting.field2
                pageComponentSetting.field3 = setting.field3
                pageComponentSetting.field4 = setting.field4
                pageComponentSetting.field5 = setting.field5
            });
    }

    constructor(
        name, 
        displayName, 
        settingComponentBuilder, 
        getComponentSettingForPageComponent,
        setComponentSettingOfPageComponent)
    {
        this.name = name;
        this.displayName = displayName;
        // settingComponentBuilder = (pageComponentSetting: any, setPageComponentSetting: any) => ReactNode
        this.settingComponentBuilder = settingComponentBuilder;
        this.getComponentSettingForPageComponent = getComponentSettingForPageComponent;
        this.setComponentSettingOfPageComponent = setComponentSettingOfPageComponent;
    }

    bulidConfigComponent(pageComponent){
        return this.settingComponentBuilder(
            this.getSettingForPageComponent(pageComponent), 
            (setting)=>{
                this.setSettingOfPageComponent(pageComponent, setting);
            });
    }

    getSettingForPageComponent(pageComponent){
        return this.getComponentSettingForPageComponent(pageComponent, this.name);
    }

    setSettingOfPageComponent(pageComponent, setting){
        this.setComponentSettingOfPageComponent(pageComponent, this.name, setting);
    }
}