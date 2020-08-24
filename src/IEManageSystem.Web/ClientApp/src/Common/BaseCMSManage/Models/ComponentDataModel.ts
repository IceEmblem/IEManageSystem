import SingleDataModel from "./SingleDataModel";
import DataCollectionBase from "./DataCollectionBase";

export default class ComponentDataModel extends DataCollectionBase 
{
    public id: number;
    public sign: string;

    static CreateDefaultComponentData(sign) : ComponentDataModel{
        let componentDataModel = new ComponentDataModel();
        componentDataModel.id = 0;
        componentDataModel.sign = sign;
        componentDataModel.singleDatas = [];
        return componentDataModel;
    }
}