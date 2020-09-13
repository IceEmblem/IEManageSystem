import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

const other = 'OtherSetting'

export default class IEButtonSetting {
    setting: PageComponentSettingModel;

    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get text() {
        return this.setting.getDefauleData().field1 || '';
    }

    set text(val) {
        this.setting.getDefauleData().field1 = val;
    }

    get url(){
        return this.setting.getDefauleData().field2 || '/';
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

    get bgcolor(){
        return this.setting.getOrCreateSingleDate(other).field1;
    }
    
    set bgcolor(val){
        this.setting.getOrCreateSingleDate(other).field1 = val;
    }

    get color(){
        return this.setting.getOrCreateSingleDate(other).field2;
    }
    
    set color(val){
        this.setting.getOrCreateSingleDate(other).field2 = val;
    }

    get icon(){
        return this.setting.getOrCreateSingleDate(other).field3;
    }
    
    set icon(val){
        this.setting.getOrCreateSingleDate(other).field3 = val;
    }

    get fontSize(){
        return this.setting.getOrCreateSingleDate(other).field4;
    }
    
    set fontSize(val){
        this.setting.getOrCreateSingleDate(other).field4 = val;
    }
}

