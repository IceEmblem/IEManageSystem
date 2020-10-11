import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: any;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get time(){
        return this.setting.time || 'init';
    }

    set time(val){
        this.setting.time = val;
    }

    get direction(){
        return this.setting.direction;
    }

    set direction(val){
        this.setting.direction = val;
    }

    get initValue(){
        return this.setting.initValue || 0;
    }

    set initValue(val){
        let num = new Number(val).valueOf();
        if(num < 0 || num > 100){
            this.setting.initValue = 0;
        }
        else{
            this.setting.initValue = val;
        }
    }

    get isOverHidden(){
        return this.setting.isOverHidden === undefined ? true : this.setting.isOverHidden;
    }

    set isOverHidden(val){
        this.setting.isOverHidden = val;
    }

    get speed(){
        return this.setting.speed || 180;
    }

    set speed(val){
        this.setting.speed = val;
    }

    get repeatTime(){
        return this.setting.repeatTime || 3;
    }

    set repeatTime(val){
        this.setting.repeatTime = val;
    }

    get endVal(){
        return this.setting.endVal || 100;
    }

    set endVal(val){
        this.setting.endVal = val;
    }
}