import SingleDataModel from "./SingleDataModel";

export default class ContentComponentDataModel {
    public static defaultDataName : string = "__default__";

    public id: number;
    public sign: string;
    public singleDatas: Array<SingleDataModel>;

    static createDefaultComponentData():ContentComponentDataModel
    {
        return new ContentComponentDataModel({id: 0, sign: "0", singleDatas: []});
    }

    constructor(data:any)
    {
        this.id = data.id;
        this.sign = data.sign;

        this.singleDatas = [];
        data.singleDatas.forEach((element:any) => {
            this.singleDatas.push(new SingleDataModel(element));
        });
    }

    // 获取默认数据，不存在则创建
    getDefauleData() : SingleDataModel
    {
        let defaultData = this.singleDatas.find(e=>e.name == ContentComponentDataModel.defaultDataName);
        if(!defaultData){
            defaultData = new SingleDataModel({
                id: 0,
                name: ContentComponentDataModel.defaultDataName,
                sortIndex: 0
            });
            this.singleDatas.push(defaultData);
        }
        return defaultData;
    }
}