import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get height(){
        return this.setting.getDefauleData().field1;
    }

    set height(val){
        this.setting.getDefauleData().field1 = val;
    }

    get width(){
        return this.setting.getDefauleData().field2 || "100%";
    }

    set width(val){
        this.setting.getDefauleData().field2 = val;
    }
}