import SingleDataModel from "../SingleDataModel";
import DataCollectionBase from "../DataCollectionBase";

export default class PageComponentSettingModel extends DataCollectionBase 
{
    public id: number;
    public name:string;
    public displayName:string;

    static createDefaultSettingData(name:string, displayName:string):PageComponentSettingModel
    {
        return new PageComponentSettingModel({id: 0, name: name, displayName:displayName, singleDatas: []});
    }

    constructor(data:any)
    {
        super(data.singleDatas);
        
        this.id = data.id;
        this.name = data.name;
        this.displayName = data.displayName;
    }
}