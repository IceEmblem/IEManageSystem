import ContentComponentDataModel from "BaseCMSManage/Models/ComponentDataModel"

export default class Data {
    data: ContentComponentDataModel;
    
    constructor(contentComponentDataModel:ContentComponentDataModel){
        this.data = contentComponentDataModel;
    }

    setData(contentComponentDataModel:ContentComponentDataModel){
        this.data = contentComponentDataModel;
    }

    get link(){
        return this.data.getDefauleData().field1;
    }

    set link(val){
        this.data.getDefauleData().field1 = val;
    }
}