import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get url(){
        return this.setting.getDefauleData().field1 || "/Page/PostList";
    }

    set url(val){
        this.setting.getDefauleData().field1 = val;
    }

    get fontColor(){
        return this.setting.getDefauleData().field2;
    }

    set fontColor(val){
        this.setting.getDefauleData().field2 = val;
    }

    get iconPos(){
        return this.setting.getDefauleData().field3 || 'left';
    }

    set iconPos(val){
        this.setting.getDefauleData().field3 = val;
    }

    get showBorder(){
        return this.setting.getDefauleData().field4 || 'false';
    }

    set showBorder(val){
        this.setting.getDefauleData().field4 = val;
    }
}