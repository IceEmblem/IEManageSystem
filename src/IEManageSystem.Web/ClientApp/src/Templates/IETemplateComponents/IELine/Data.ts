import ComponentDataModel from "BaseCmsManage/Models/ComponentDataModel";
import SingleDataModel from "BaseCmsManage/Models/SingleDataModel";

class SingleData {
    private _componentSignData : SingleDataModel;

    public constructor(componentSignData : SingleDataModel){
        this._componentSignData = componentSignData;
    }

    public get x(){
        return this._componentSignData.field1
    }

    public set x(val){
        this._componentSignData.field1 = val;
    }

    public get line(){
        return this._componentSignData.field2;
    }

    public set line(val){
        this._componentSignData.field2 = val;
    }

    public get y(){
        return this._componentSignData.field3;
    }

    public set y(val){
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

    public createSingleData(x: string, y: string, line: string)
    {
        let singleData = new SingleData(this.componentData.createSingleData(Data._dataName));
        singleData.line = line;
        singleData.x = x;
        singleData.y = y;
    }

    public deleteSingleData(sortIndex: Number){
        this.componentData.deleteSingleData(sortIndex);
    }
}