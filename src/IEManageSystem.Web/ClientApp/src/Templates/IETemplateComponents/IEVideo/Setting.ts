import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get autoPlay(){
        return this.setting.getDefauleData().field1 || "false";
    }

    set autoPlay(val){
        this.setting.getDefauleData().field1 = val;
    }

    get loopPlay(){
        return this.setting.getDefauleData().field2 || 'false';
    }

    set loopPlay(val){
        this.setting.getDefauleData().field2 = val;
    }

    get hiddenTool(){
        return this.setting.getDefauleData().field3 || 'false';
    }

    set hiddenTool(val){
        this.setting.getDefauleData().field3 = val;
    }

    get height(){
        return this.setting.getDefauleData().field4;
    }

    set height(val){
        this.setting.getDefauleData().field4 = val;
    }
}