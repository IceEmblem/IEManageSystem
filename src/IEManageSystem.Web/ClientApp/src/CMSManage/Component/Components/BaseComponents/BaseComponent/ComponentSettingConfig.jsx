import PageComponentSettingModel from 'CMSManage/Models/Pages/PageComponentSettingModel'

export default class ComponentSettingConfig {
    static BuildBasicComponentSettingConfig(name, displayName, settingComponentBuilder){
        return new ComponentSettingConfig(name, displayName, settingComponentBuilder, 
            (pageComponent, name)=>{ 
                return pageComponent 
            },
            (pageComponent, name, setting)=>{ 
                pageComponent.sign = setting.sign;
                pageComponent.pageComponentBaseSetting = setting.pageComponentBaseSetting;
            });
    }

    static BuildPageLeafComponentSettingConfig(name, displayName, settingComponentBuilder){
        return new ComponentSettingConfig(name, displayName, settingComponentBuilder, 
            (pageComponent, name)=>{ return pageComponent.pageLeafSetting },
            (pageComponent, name, setting)=>{ pageComponent.pageLeafSetting = setting });
    }

    static BuildPageComponentSettingConfig(name, displayName, settingComponentBuilder){
        return new ComponentSettingConfig(name, displayName, settingComponentBuilder, 
            (pageComponent, name)=>{ 
                let pageComponentSetting = pageComponent.pageComponentSettings.find(item => item.name == name);

                // 组件设置数据
                return pageComponentSetting;
            },
            (pageComponent, name, setting)=>{ 
                let pageComponentSetting = pageComponent.pageComponentSettings.find(item => item.name == name);
                pageComponentSetting.singleDatas = setting.singleDatas;
            });
    }

    static BuildMenuComponentSettingConfig(name, displayName, settingComponentBuilder){
        return new ComponentSettingConfig(name, displayName, settingComponentBuilder, 
            (pageComponent, name)=>{ return pageComponent.menuName },
            (pageComponent, name, setting)=>{ pageComponent.menuName = setting });
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

    // 在 setting 更新时，会调用 pageComponentUpdate，提醒调用方
    bulidConfigComponent(pageComponent, pageComponentUpdate){
        return this.settingComponentBuilder(
            this.getSettingForPageComponent(pageComponent), 
            (setting)=>{
                this.setSettingOfPageComponent(pageComponent, setting);
                pageComponentUpdate(pageComponent);
            });
    }

    getSettingForPageComponent(pageComponent){
        return this.getComponentSettingForPageComponent(pageComponent, this.name);
    }

    setSettingOfPageComponent(pageComponent, setting){
        this.setComponentSettingOfPageComponent(pageComponent, this.name, setting);
    }
}