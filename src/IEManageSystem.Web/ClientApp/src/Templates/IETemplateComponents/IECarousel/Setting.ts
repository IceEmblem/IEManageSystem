import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

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
        return this.setting.getDefauleData().field2 || "300";
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

    // 遮罩颜色
    get shade(){
        return this.setting.getDefauleData().field4 || "#0000";
    }

    set shade(val){
        this.setting.getDefauleData().field4 = val;
    }
}