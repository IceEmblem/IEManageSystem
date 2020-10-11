import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class IEButtonSetting {
    setting: any;

    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get text() {
        return this.setting.text || '';
    }

    set text(val) {
        this.setting.text = val;
    }

    get url(){
        return this.setting.url;
    }

    set url(val){
        this.setting.url = val;
    }

    get btnType(){
        return this.setting.btnType;
    }

    set btnType(val){
        this.setting.btnType = val;
    }

    get size(){
        return this.setting.size;
    }

    set size(val){
        this.setting.size = val;
    }

    get shape(){
        return this.setting.shape;
    }
    
    set shape(val){
        this.setting.shape = val;
    }

    get bgcolor(){
        return this.setting.bgcolor;
    }
    
    set bgcolor(val){
        this.setting.bgcolor = val;
    }

    get color(){
        return this.setting.color;
    }
    
    set color(val){
        this.setting.color = val;
    }

    get icon(){
        return this.setting.icon;
    }
    
    set icon(val){
        this.setting.icon = val;
    }

    get fontSize(){
        return this.setting.fontSize;
    }
    
    set fontSize(val){
        this.setting.fontSize = val;
    }

    get btnHeight(){
        return this.setting.btnHeight;
    }
    
    set btnHeight(val){
        this.setting.btnHeight = val;
    }
}

