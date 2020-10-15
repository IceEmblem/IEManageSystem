import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: any;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get tabPosition(){
        return this.setting.tabPosition || "top";
    }

    set tabPosition(val){
        this.setting.tabPosition = val;
    }
}