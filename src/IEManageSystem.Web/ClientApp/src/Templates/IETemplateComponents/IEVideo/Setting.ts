import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: any;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get autoPlay(){
        return this.setting.autoPlay == undefined ? false : this.setting.autoPlay;
    }

    set autoPlay(val){
        this.setting.autoPlay = val;
    }

    get loopPlay(){
        return this.setting.loopPlay == undefined ? false : this.setting.loopPlay;
    }

    set loopPlay(val){
        this.setting.loopPlay = val;
    }

    get hiddenTool(){
        return this.setting.hiddenTool == undefined ? false : this.setting.hiddenTool;
    }

    set hiddenTool(val){
        this.setting.hiddenTool = val;
    }

    get customizeHeight(){
        return this.setting.customizeHeight == undefined ? false : this.setting.customizeHeight;
    }

    set customizeHeight(val){
        this.setting.customizeHeight = val;
    }
}