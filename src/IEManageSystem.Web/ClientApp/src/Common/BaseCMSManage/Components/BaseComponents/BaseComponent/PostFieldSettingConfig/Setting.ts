import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: any;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
        if(!this.setting.postFields){
            this.setting.postFields = {};
        }
    }

    setPostFieldName(componentFieldName, postField: "" | "field1" | "field2" | "field3" | "field4" | "field5" ){
        this.setting.postFields[componentFieldName] = postField;
    }

    getPostFieldName(componentFieldName){
        return this.setting.postFields[componentFieldName];
    }

    getFieldValue(componentFieldName, post){
        return post[this.setting.postFields[componentFieldName]];
    }
}