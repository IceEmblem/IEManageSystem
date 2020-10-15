import ContentComponentDataModel from "BaseCMSManage/Models/ComponentDataModel"

export default class Data {
    data: ContentComponentDataModel;
    
    constructor(contentComponentDataModel:ContentComponentDataModel){
        this.data = contentComponentDataModel;
    }

    setData(contentComponentDataModel:ContentComponentDataModel){
        this.data = contentComponentDataModel;
    }

    get field1(){
        return this.data.getDefauleData().field1;
    }

    set field1(val){
        this.data.getDefauleData().field1 = val;
    }

    get field2(){
        return this.data.getDefauleData().field2;
    }

    set field2(val){
        this.data.getDefauleData().field2 = val;
    }

    get field3(){
        return this.data.getDefauleData().field3;
    }

    set field3(val){
        this.data.getDefauleData().field3 = val;
    }

    get field4(){
        return this.data.getDefauleData().field4;
    }

    set field4(val){
        this.data.getDefauleData().field4 = val;
    }

    get field5(){
        return this.data.getDefauleData().field5;
    }

    set field5(val){
        this.data.getDefauleData().field5 = val;
    }
}