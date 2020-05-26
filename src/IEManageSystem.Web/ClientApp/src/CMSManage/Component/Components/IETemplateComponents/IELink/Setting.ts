import PageComponentSettingModel from "CMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get text(){
        return this.setting.getDefauleData().field1;
    }

    set text(val){
        this.setting.getDefauleData().field1 = val;
    }

    get url(){
        return this.setting.getDefauleData().field2 || "javascript:void(0)";
    }

    set url(val){
        this.setting.getDefauleData().field2 = val;
    }

    get icon(){
        return this.setting.getDefauleData().field3;
    }

    set icon(val){
        this.setting.getDefauleData().field3 = val;
    }

    get fontSize(){
        return this.setting.getDefauleData().field4;
    }

    set fontSize(val){
        this.setting.getDefauleData().field4 = val;
    }

    get fontColor(){
        return this.setting.getDefauleData().field5;
    }

    set fontColor(val){
        this.setting.getDefauleData().field5 = val;
    }
}