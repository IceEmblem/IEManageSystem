import PageComponentSettingModel from "CMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get fontColor(){
        return this.setting.getDefauleData().field1 || "#fff";
    }

    set fontColor(val){
        this.setting.getDefauleData().field1 = val;
    }

    get height(){
        return this.setting.getDefauleData().field2 || "15rem";
    }

    set height(val){
        this.setting.getDefauleData().field2 = val;
    }

    get width(){
        return this.setting.getDefauleData().field3 || "35%";
    }

    set width(val){
        this.setting.getDefauleData().field3 = val;
    }
}