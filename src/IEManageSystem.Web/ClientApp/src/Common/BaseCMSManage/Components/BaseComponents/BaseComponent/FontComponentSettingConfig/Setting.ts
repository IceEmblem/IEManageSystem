import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get fontSize(){
        return this.setting.fontSize;
    }

    set fontSize(val){
        this.setting.fontSize = val;
    }

    get lineHeight(){
        return this.setting.lineHeight;
    }

    set lineHeight(val){
        this.setting.lineHeight = val;
    }

    get color(){
        return this.setting.color;
    }

    set color(val){
        this.setting.color = val;
    }

    get fontWeight(){
        return this.setting.fontWeight;
    }

    set fontWeight(val){
        this.setting.fontWeight = val;
    }

    get fontStyle(){
        return this.setting.fontStyle;
    }

    set fontStyle(val){
        this.setting.fontStyle = val;
    }

    toStyle(){
        return {
            fontSize: this.fontSize,
            lineHeight: this.lineHeight,
            color: this.color,
            fontWeight: this.fontWeight,
            fontStyle: this.fontStyle
        }
    }
}