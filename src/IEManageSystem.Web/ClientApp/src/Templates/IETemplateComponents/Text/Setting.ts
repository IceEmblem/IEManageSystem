import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get textType(){
        return this.setting.getDefauleData().field1 || "h4";
    }

    set textType(val){
        this.setting.getDefauleData().field1 = val;
    }

    get fontColor(){
        return this.setting.getDefauleData().field2;
    }

    set fontColor(val){
        this.setting.getDefauleData().field2 = val;
    }

    get textSource(){
        return this.setting.getDefauleData().field3 || 'CText';
    }

    set textSource(val){
        this.setting.getDefauleData().field3 = val;
    }
}