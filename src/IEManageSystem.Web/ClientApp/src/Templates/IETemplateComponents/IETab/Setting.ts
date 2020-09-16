import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get textType(){
        return this.setting.getDefauleData().field1 || "h4";
    }

    set textType(val){
        this.setting.getDefauleData().field1 = val;
    }
}