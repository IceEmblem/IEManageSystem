import ContentComponentDataModel from "CMSManage/Models/ComponentDataModel"

export default class Data {
    data: ContentComponentDataModel;
    
    constructor(contentComponentDataModel:ContentComponentDataModel){
        this.data = contentComponentDataModel;
    }

    setData(contentComponentDataModel:ContentComponentDataModel){
        this.data = contentComponentDataModel;
    }

    get imgUrl(){
        return this.data.getDefauleData().field1;
    }

    set imgUrl(val){
        this.data.getDefauleData().field1 = val;
    }

    get text(){
        return this.data.getDefauleData().field2;
    }

    set text(val){
        this.data.getDefauleData().field2 = val;
    }
}