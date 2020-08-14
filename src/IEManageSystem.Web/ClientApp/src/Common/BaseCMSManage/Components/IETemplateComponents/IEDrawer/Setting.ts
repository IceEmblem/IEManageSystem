import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get imgHeight(){
        return this.setting.getDefauleData().field1;
    }

    set imgHeight(val){
        this.setting.getDefauleData().field1 = val;
    }

    get boxWidth(){
        return this.setting.getDefauleData().field2 || 200;
    }

    set boxWidth(val){
        this.setting.getDefauleData().field2 = val;
    }
}