import PageComponentSettingModel from "CMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    static readonly styleSettingName : string = "style";
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get col(){
        return this.setting.getOrCreateSingleDate(Setting.styleSettingName).field1 || 1;
    }

    set col(val){
        this.setting.getOrCreateSingleDate(Setting.styleSettingName).field1 = val;
    }

    get title(){
        return this.setting.getOrCreateSingleDate(Setting.styleSettingName).field2;
    }

    set title(val){
        this.setting.getOrCreateSingleDate(Setting.styleSettingName).field2 = val;
    }

    get field1(){
        return this.setting.getDefauleData().field1;
    }

    set field1(val){
        this.setting.getDefauleData().field1 = val;
    }

    get field2(){
        return this.setting.getDefauleData().field2;
    }

    set field2(val){
        this.setting.getDefauleData().field2 = val;
    }

    get field3(){
        return this.setting.getDefauleData().field3;
    }

    set field3(val){
        this.setting.getDefauleData().field3 = val;
    }

    get field4(){
        return this.setting.getDefauleData().field4;
    }

    set field4(val){
        this.setting.getDefauleData().field4 = val;
    }

    get field5(){
        return this.setting.getDefauleData().field5;
    }

    set field5(val){
        this.setting.getDefauleData().field5 = val;
    }
}