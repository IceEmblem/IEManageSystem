export default class TemplatePage {
    constructor(data){
        // pageModel
        this.page = data.page;
        // List<pageComponentModel>
        this.pageComponents = data.pageComponents;
        // List<defaultComponentModel>
        this.defaultComponentDatas = [];
        if(data.defaultComponentDatas){
            this.defaultComponentDatas = data.defaultComponentDatas;
        }
    }
}