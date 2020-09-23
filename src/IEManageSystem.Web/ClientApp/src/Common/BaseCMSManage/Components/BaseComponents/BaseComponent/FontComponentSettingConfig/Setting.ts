import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get fontSize(){
        return this.setting.getDefauleData().field1;
    }

    set fontSize(val){
        this.setting.getDefauleData().field1 = val;
    }

    get lineHeight(){
        return this.setting.getDefauleData().field2;
    }

    set lineHeight(val){
        this.setting.getDefauleData().field2 = val;
    }

    get color(){
        return this.setting.getDefauleData().field3;
    }

    set color(val){
        this.setting.getDefauleData().field3 = val;
    }

    get fontWeight(){
        return this.setting.getDefauleData().field4;
    }

    set fontWeight(val){
        this.setting.getDefauleData().field4 = val;
    }

    get fontStyle(){
        return this.setting.getDefauleData().field5;
    }

    set fontStyle(val){
        this.setting.getDefauleData().field5 = val;
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