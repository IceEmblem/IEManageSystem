import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get copyright(){
        return this.setting.getDefauleData().field1 || "Copyright © 2019 by IceEmblem. All rights reserved.";
    }

    set copyright(val){
        this.setting.getDefauleData().field1 = val;
    }

    get text(){
        return this.setting.getDefauleData().field2 || "由 IceEmblem 开发";
    }

    set text(val){
        this.setting.getDefauleData().field2 = val;
    }

    get beianIcon(){
        return this.setting.getDefauleData().field3;
    }

    set beianIcon(val){
        this.setting.getDefauleData().field3 = val;
    }

    get code(){
        return this.setting.getDefauleData().field4;
    }

    set code(val){
        this.setting.getDefauleData().field4 = val;
    }

    get color(){
        return this.setting.getDefauleData().field5;
    }

    set color(val){
        this.setting.getDefauleData().field5 = val;
    }
}