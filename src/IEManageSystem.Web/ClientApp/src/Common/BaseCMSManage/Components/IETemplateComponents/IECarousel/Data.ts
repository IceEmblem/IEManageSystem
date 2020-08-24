import ComponentDataModel from '../../../../Models/ComponentDataModel'
import SingleDataModel from '../../../../Models/SingleDataModel'

class SingleData {
    private _componentSignData : SingleDataModel;

    public constructor(componentSignData : SingleDataModel){
        this._componentSignData = componentSignData;
    }

    public get title(){
        return this._componentSignData.field1
    }

    public set title(val){
        this._componentSignData.field1 = val;
    }

    public get content(){
        return this._componentSignData.field2;
    }

    public set content(val){
        this._componentSignData.field2 = val;
    }

    public get img(){
        return this._componentSignData.field3;
    }

    public set img(val){
        this._componentSignData.field3 = val;
    }

    public get sortIndex(){
        return this._componentSignData.sortIndex;
    }
}

export default class Data {
    private static _dataName = "DataList";

    public componentData:ComponentDataModel;

    public constructor(componentData:ComponentDataModel){
        this.componentData = componentData;
    }

    public getDatas():Array<SingleData>
    {
        let datas = [];
        this.componentData.getSingleDatas(Data._dataName).forEach(item=>{
            datas.push(new SingleData(item))
        });

        return datas;
    }

    public createSingleData(){
        this.componentData.createSingleData(Data._dataName);
    }

    public deleteSingleData(sortIndex: Number){
        this.componentData.deleteSingleData(sortIndex);
    }
}