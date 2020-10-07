import ContentComponentDataModel from "BaseCMSManage/Models/ComponentDataModel"

export default class Data {
    data: ContentComponentDataModel;
    
    constructor(contentComponentDataModel:ContentComponentDataModel){
        this.data = contentComponentDataModel;
    }

    get url(){
        return this.data.getDefauleData().url;
    }

    set url(val){
        this.data.getDefauleData().url = val;
    }
}