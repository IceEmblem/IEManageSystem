import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: any;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get direction(){
        return this.setting.direction || 'row';
    }

    set direction(val){
        this.setting.direction = val;
    }

    get justifyContent(){
        return this.setting.justifyContent || 'flex-start';
    }

    set justifyContent(val){
        this.setting.justifyContent = val;
    }

    get alignItems(){
        return this.setting.alignItems || 'flex-start';
    }

    set alignItems(val){
        this.setting.alignItems = val;
    }
    
    get wrap(){
        return this.setting.wrap || "wrap";
    }

    set wrap(val){
        this.setting.wrap = val;
    }

    get alignContent(){
        return this.setting.alignContent || 'flex-start';
    }

    set alignContent(val){
        this.setting.alignContent = val;
    }
}