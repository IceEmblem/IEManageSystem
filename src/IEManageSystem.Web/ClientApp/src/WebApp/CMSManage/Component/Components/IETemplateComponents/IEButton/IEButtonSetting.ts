import PageComponentSettingModel from "@/CMSManage/Models/Pages/PageComponentSettingModel"

export default class IEButtonSetting {
    setting: PageComponentSettingModel;

    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get text() {
        return this.setting.getDefauleData().field1 || "IE-按钮";
    }

    set text(val) {
        this.setting.getDefauleData().field1 = val;
    }

    get url(){
        return this.setting.getDefauleData().field2 || "javescript:void(0)";
    }

    set url(val){
        this.setting.getDefauleData().field2 = val;
    }

    get btnType(){
        return this.setting.getDefauleData().field3;
    }

    set btnType(val){
        this.setting.getDefauleData().field3 = val;
    }

    get size(){
        return this.setting.getDefauleData().field4 || "false";
    }

    set size(val){
        this.setting.getDefauleData().field4 = val;
    }

    get shape(){
        return this.setting.getDefauleData().field5;
    }
    
    set shape(val){
        this.setting.getDefauleData().field5 = val;
    }
}

