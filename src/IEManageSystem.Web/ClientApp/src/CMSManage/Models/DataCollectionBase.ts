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

        this.singleDatas.sort(e=>e.sortIndex);
    }

    // 获取默认数据，不存在则创建
    getDefauleData(): SingleDataModel {
        if(this._defaultData){
            return this._defaultData;
        }

        let defaultData = this.singleDatas.find(e => e.name == DataCollectionBase.defaultDataName);
        if (!defaultData) {
            let sortIndex = this.singleDatas.length == 0 ? 0 : (this.singleDatas[this.singleDatas.length-1].sortIndex + 1);
            defaultData = new SingleDataModel({
                id: 0,
                name: DataCollectionBase.defaultDataName,
                sortIndex: sortIndex
            });
            this.singleDatas.push(defaultData);
        }
        this._defaultData = defaultData;

        return this._defaultData;
    }

    createSingleData(name:string){
        let sortIndex = this.singleDatas.length == 0 ? 0 : (this.singleDatas[this.singleDatas.length-1].sortIndex + 1);

        let data = new SingleDataModel({
            id: 0,
            name: name,
            sortIndex: sortIndex
        });
        this.singleDatas.push(data);

        return data;
    }

    deleteSingleData(sortIndex: Number){
        this.singleDatas = this.singleDatas.filter(item=>item.sortIndex != sortIndex);
    }

    getSingleDatas(name:string){
        return this.singleDatas.filter(e=>e.name == name);
    }
}