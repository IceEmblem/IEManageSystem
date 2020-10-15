import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: any;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get col(){
        return this.setting.col || 1;
    }

    set col(val){
        this.setting.col = val;
    }

    get title(){
        return this.setting.title;
    }

    set title(val){
        this.setting.title = val;
    }

    get color(){
        return this.setting.color;
    }

    set color(val){
        this.setting.color = val;
    }

    get bordered(){
        return this.setting.bordered;
    }

    set bordered(val){
        this.setting.bordered = val;
    }

    get field1(){
        return this.setting.field1;
    }

    set field1(val){
        this.setting.field1 = val;
    }

    get field2(){
        return this.setting.field2;
    }

    set field2(val){
        this.setting.field2 = val;
    }

    get field3(){
        return this.setting.field3;
    }

    set field3(val){
        this.setting.field3 = val;
    }

    get field4(){
        return this.setting.field4;
    }

    set field4(val){
        this.setting.field4 = val;
    }

    get field5(){
        return this.setting.field5;
    }

    set field5(val){
        this.setting.field5 = val;
    }
}