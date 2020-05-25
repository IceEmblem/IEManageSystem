import ContentComponentDataModel from "CMSManage/Models/PageDatas/ContentComponentDataModel"

export default class Data {
    data: ContentComponentDataModel;
    
    constructor(contentComponentDataModel:ContentComponentDataModel){
        this.data = contentComponentDataModel;
    }

    setData(contentComponentDataModel:ContentComponentDataModel){
        this.data = contentComponentDataModel;
    }

    get text(){
        return this.data.getDefauleData().field1 || "一个未知的标题";
    }

    set text(val){
        this.data.getDefauleData().field1 = val;
    }

    get smallText(){
        return this.data.getDefauleData().field2 || "一个未知的副标题";
    }

    set smallText(val){
        this.data.getDefauleData().field2 = val;
    }
}