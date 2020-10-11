import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: any;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get url(){
        return this.setting.url || "/Page/PostList";
    }

    set url(val){
        this.setting.url = val;
    }

    get fontColor(){
        return this.setting.fontColor;
    }

    set fontColor(val){
        this.setting.fontColor = val;
    }

    get iconPos(){
        return this.setting.iconPos || 'left';
    }

    set iconPos(val){
        this.setting.iconPos = val;
    }

    get showBorder(){
        return this.setting.showBorder == undefined ? false : this.setting.showBorder;
    }

    set showBorder(val){
        this.setting.showBorder = val;
    }
}