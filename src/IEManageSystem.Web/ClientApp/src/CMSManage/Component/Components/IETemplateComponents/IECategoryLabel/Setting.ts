import PageComponentSettingModel from '../../../../Models/Pages/PageComponentSettingModel'
import SingleDataModel from '../../../../Models/SingleDataModel'

class SingleData {
    private _componentSignData : SingleDataModel;

    public constructor(componentSignData : SingleDataModel){
        this._componentSignData = componentSignData;
    }

    public get displayName(){
        return this._componentSignData.field1
    }

    public set displayName(val){
        this._componentSignData.field1 = val;
    }

    public get tagName(){
        return this._componentSignData.field2;
    }

    public set tagName(val){
        this._componentSignData.field2 = val;
    }

    public get sortIndex(){
        return this._componentSignData.sortIndex;
    }
}

export default class Setting {
    private static _settingName = "SettingList";

    public componentSetting:PageComponentSettingModel;

    public constructor(componentSetting:PageComponentSettingModel){
        this.componentSetting = componentSetting;
    }

    public getSettings():Array<SingleData>
    {
        let settings = [];
        this.componentSetting.getSingleDatas(Setting._settingName).forEach(item=>{
            settings.push(new SingleData(item))
        });

        return settings;
    }

    public createSingleData(){
        this.componentSetting.createSingleData(Setting._settingName);
    }

    public deleteSingleData(sortIndex: Number){
        this.componentSetting.deleteSingleData(sortIndex);
    }
}