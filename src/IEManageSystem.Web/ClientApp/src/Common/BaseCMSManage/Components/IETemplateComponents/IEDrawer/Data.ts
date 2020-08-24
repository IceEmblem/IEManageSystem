import ContentComponentDataModel from "BaseCMSManage/Models/ComponentDataModel"

export default class Data {
    data: ContentComponentDataModel;
    
    constructor(contentComponentDataModel:ContentComponentDataModel){
        this.data = contentComponentDataModel;
    }

    setData(contentComponentDataModel:ContentComponentDataModel){
        this.data = contentComponentDataModel;
    }

    get title(){
        return this.data.getDefauleData().field1 || "一个未知的标题";
    }

    set title(val){
        this.data.getDefauleData().field1 = val;
    }

    get content(){
        return this.data.getDefauleData().field2 || "没有任何内容呀！！！";
    }

    set content(val){
        this.data.getDefauleData().field2 = val;
    }

    get imgUrl(){
        return this.data.getDefauleData().field3;
    }

    set imgUrl(val){
        this.data.getDefauleData().field3 = val;
    }
}