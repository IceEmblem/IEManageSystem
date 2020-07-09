export default class TemplatePage{

    constructor(data){
        this.page = data.page;
        this.defaultComponentDatas = [];
        if(data.defaultComponentDatas){
            this.defaultComponentDatas = data.defaultComponentDatas;
        }
    }
}