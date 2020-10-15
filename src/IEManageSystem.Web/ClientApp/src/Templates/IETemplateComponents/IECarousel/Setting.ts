import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: any;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get fontColor(){
        return this.setting.fontColor || "#fff";
    }

    set fontColor(val){
        this.setting.fontColor = val;
    }

    get height(){
        return this.setting.height || 300;
    }

    set height(val){
        this.setting.height = val;
    }

    get width(){
        return this.setting.width || 200;
    }

    set width(val){
        this.setting.width = val;
    }

    // 遮罩颜色
    get shade(){
        return this.setting.shade || "#0000";
    }

    set shade(val){
        this.setting.shade = val;
    }
}