import PageComponentSettingModel from 'BaseCMSManage/Models/Pages/PageComponentSettingModel'

export default class Setting {
    public setting: any;

    public constructor(componentSetting:PageComponentSettingModel){
        this.setting = componentSetting;
    }

    public getSettings():Array<SingleData>
    {
        return this.setting.datas;
    }

    public createSingleData(){
        this.setting.datas.push({displayName: undefined, tagName: undefined, sortIndex: this.setting.datas.length});
    }

    public deleteSingleData(sortIndex: Number){
        this.setting.datas.shlice(sortIndex, 1)
    }
}