import ContentComponentDataModel from "BaseCMSManage/Models/ComponentDataModel"

export default class Data {
    data: ContentComponentDataModel;
    
    constructor(contentComponentDataModel:ContentComponentDataModel){
        this.data = contentComponentDataModel;
    }

    get url(){
        return this.data.getDefauleData().field1;
    }

    set url(val){
        this.data.getDefauleData().field1 = val;
    }

    get url2(){
        return this.data.getDefauleData().field2;
    }

    set url2(val){
        this.data.getDefauleData().field2 = val;
    }

    get img(){
        return this.data.getDefauleData().field3;
    }

    set img(val){
        this.data.getDefauleData().field3 = val;
    }
}