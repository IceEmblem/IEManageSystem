import PageComponentSettingModel from "CMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get col(){
        return this.setting.getDefauleData().field1 || 5;
    }

    set col(val){
        this.setting.getDefauleData().field1 = val;
    }

    get heigth(){
        return this.setting.getDefauleData().field2;
    }

    set heigth(val){
        this.setting.getDefauleData().field2 = val;
    }
}