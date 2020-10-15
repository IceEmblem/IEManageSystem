import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get copyright(){
        return this.setting.copyright || "Copyright © 2019 by IceEmblem. All rights reserved.";
    }

    set copyright(val){
        this.setting.copyright = val;
    }

    get text(){
        return this.setting.text || "由 IceEmblem 开发";
    }

    set text(val){
        this.setting.text = val;
    }

    get beianIcon(){
        return this.setting.beianIcon;
    }

    set beianIcon(val){
        this.setting.beianIcon = val;
    }

    get code(){
        return this.setting.code;
    }

    set code(val){
        this.setting.code = val;
    }

    get color(){
        return this.setting.color;
    }

    set color(val){
        this.setting.color = val;
    }
}