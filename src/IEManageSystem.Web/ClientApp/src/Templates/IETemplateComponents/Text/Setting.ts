import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: any;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get textType(){
        return this.setting.textType || "h4";
    }

    set textType(val){
        this.setting.textType = val;
    }

    get textSource(){
        return this.setting.textSource || 'CText';
    }

    set textSource(val){
        this.setting.textSource = val;
    }

    get align(){
        return this.setting.align || 'flex-start';
    }

    set align(val){
        this.setting.align = val;
    }
}