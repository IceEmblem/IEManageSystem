import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

const otherSettingName = 'OtherSetting'

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get time(){
        return this.setting.getDefauleData().field1 || 'init';
    }

    set time(val){
        this.setting.getDefauleData().field1 = val;
    }

    get direction(){
        return this.setting.getDefauleData().field2;
    }

    set direction(val){
        this.setting.getDefauleData().field2 = val;
    }

    get initValue(){
        return this.setting.getDefauleData().field3 || '0';
    }

    set initValue(val){
        let num = new Number(val).valueOf();
        if(num < 0 || num > 100){
            this.setting.getDefauleData().field3 = '0';
        }
        else{
            this.setting.getDefauleData().field3 = val;
        }
    }

    get isOverHidden(){
        return this.setting.getDefauleData().field4 || 'true';
    }

    set isOverHidden(val){
        this.setting.getDefauleData().field4 = val;
    }

    get speed(){
        return this.setting.getDefauleData().field5 || '180';
    }

    set speed(val){
        this.setting.getDefauleData().field5 = val;
    }

    get repeatTime(){
        return this.setting.getOrCreateSingleDate(otherSettingName).field1 || '3';
    }

    set repeatTime(val){
        this.setting.getOrCreateSingleDate(otherSettingName).field1 = val;
    }

    get endVal(){
        return this.setting.getOrCreateSingleDate(otherSettingName).field2 || '100';
    }

    set endVal(val){
        this.setting.getOrCreateSingleDate(otherSettingName).field2 = val;
    }
}