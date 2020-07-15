import PageComponentSettingModel from "CMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;

    constructor(pageComponentSetting: PageComponentSettingModel) {
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting: PageComponentSettingModel) {
        this.setting = pageComponentSetting;
    }

    get lines() {
        return this.setting.getDefauleData().field1;
    }

    set lines(val) {
        this.setting.getDefauleData().field1 = val;
    }

    getLines() : Array<string>
    {
        return this.setting.getDefauleData().field1 ?
            this.setting.getDefauleData().field1.split("|")
            : []
    }
}