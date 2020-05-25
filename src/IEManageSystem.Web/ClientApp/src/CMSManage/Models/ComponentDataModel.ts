import SingleDataModel from "./SingleDataModel";
import DataCollectionBase from "./DataCollectionBase";

export default class ComponentDataModel extends DataCollectionBase 
{
    public id: number;
    public sign: string;

    static createDefaultComponentData():ComponentDataModel
    {
        return new ComponentDataModel({id: 0, sign: "0", singleDatas: []});
    }

    constructor(data:any)
    {
        super(data.singleDatas);

        this.id = data.id;
        this.sign = data.sign;
    }
}