import PageComponentSettingModel from "CMSManage/Models/Pages/PageComponentSettingModel"
import SingleDataModel from "CMSManage/Models/SingleDataModel"

class Data {
    singleData : SingleDataModel;

    constructor(singleDataModel : SingleDataModel){
        this.singleData = singleDataModel;
    }

    get text(){
        return this.singleData.field1;
    }

    set text(val){
        this.singleData.field1 = val;
    }

    get url(){
        return this.singleData.field2;
    }

    set url(val){
        this.singleData.field2 = val;
    }
}

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    createSeleteData(){
        this.setting.createSingleData("SeleteDatas")
    }

    getSeleteDatas(){
        let dataList = [];
        this.setting.getSingleDatas("SeleteDatas").forEach(element => {
            dataList.push(new Data(element));
        });

        return dataList;
    }
}