import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get tabPosition(){
        return this.setting.getDefauleData().field1 || "top";
    }

    set tabPosition(val){
        this.setting.getDefauleData().field1 = val;
    }
}