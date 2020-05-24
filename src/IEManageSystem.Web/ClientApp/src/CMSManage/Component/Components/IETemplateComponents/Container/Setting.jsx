import PageComponentSettingModel from "CMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get direction(){
        return this.setting.getDefauleData().field1;
    }

    set direction(val){
        this.setting.getDefauleData().field1 = val;
    }

    get justifyContent(){
        return this.setting.getDefauleData().field2;
    }

    set justifyContent(val){
        this.setting.getDefauleData().field2 = val;
    }

    get alignItems(){
        return this.setting.getDefauleData().field3;
    }

    set alignItems(val){
        this.setting.getDefauleData().field3 = val;
    }
    
    get wrap(){
        return this.setting.getDefauleData().field4;
    }

    set wrap(val){
        this.setting.getDefauleData().field4 = val;
    }

    get alignContent(){
        return this.setting.getDefauleData().field5;
    }

    set alignContent(val){
        this.setting.getDefauleData().field5 = val;
    }
}