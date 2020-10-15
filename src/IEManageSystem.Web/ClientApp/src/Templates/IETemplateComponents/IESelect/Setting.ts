import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: any;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    createSeleteData(){
        this.setting.datas.push({text: '', url: ''});
    }

    getSeleteDatas(){
        return this.setting.datas;
    }

    get size(){
        return this.setting.size;
    }

    set size(val){
        this.setting.size = val;
    }
}