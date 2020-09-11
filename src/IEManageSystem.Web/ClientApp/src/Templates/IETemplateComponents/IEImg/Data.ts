import ContentComponentDataModel from "BaseCMSManage/Models/ComponentDataModel"

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

    get position(){
        return this.data.getDefauleData().field2 || 'onbottom';
    }

    set position(val){
        this.data.getDefauleData().field2 = val;
    }

    get imgHeigth(){
        return this.data.getDefauleData().field3;
    }

    set imgHeigth(val){
        this.data.getDefauleData().field3 = val;
    }

    get linkUrl(){
        return this.data.getDefauleData().field4 || "";
    }

    set linkUrl(val){
        this.data.getDefauleData().field4 = val;
    }

    get imgWidth(){
        return this.data.getDefauleData().field5;
    }

    set imgWidth(val){
        this.data.getDefauleData().field5 = val;
    }
}