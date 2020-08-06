import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get element(){
        return this.setting.getDefauleData().field1;
    }

    set element(val){
        this.setting.getDefauleData().field1 = val;
    }

    get backgroundImage(){
        return this.setting.getDefauleData().field2;
    }

    set backgroundImage(val){
        this.setting.getDefauleData().field2 = val;
    }

    get backgroundColor(){
        return this.setting.getDefauleData().field3;
    }

    set backgroundColor(val){
        this.setting.getDefauleData().field3 = val;
    }
    
    get height(){
        return this.setting.getDefauleData().field4;
    }

    set height(val){
        this.setting.getDefauleData().field4 = val;
    }
}