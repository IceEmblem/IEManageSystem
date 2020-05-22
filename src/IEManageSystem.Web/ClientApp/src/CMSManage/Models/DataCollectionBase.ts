import SingleDataModel from "./SingleDataModel";


export default abstract class DataCollectionBase {
    public static defaultDataName : string = "__default__";
    public singleDatas: Array<SingleDataModel>;
    private _defaultData: SingleDataModel;

    constructor(data:Array<any>){
        this.singleDatas = [];
        data.forEach((element:any) => {
            this.singleDatas.push(new SingleDataModel(element));
        });
    }

    // 获取默认数据，不存在则创建
    getDefauleData(): SingleDataModel {
        if(this._defaultData){
            return this._defaultData;
        }

        let defaultData = this.singleDatas.find(e => e.name == DataCollectionBase.defaultDataName);
        if (!defaultData) {
            defaultData = new SingleDataModel({
                id: 0,
                name: DataCollectionBase.defaultDataName,
                sortIndex: 0
            });
            this.singleDatas.push(defaultData);
        }
        this._defaultData = defaultData;

        return this._defaultData;
    }
}