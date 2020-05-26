import PageModel from '../../Models/Pages/PageModel'
import ComponentDataModel from '../../Models/ComponentDataModel'

export default class TemplatePage{
    page: PageModel;
    defaultComponentDatas: Array<ComponentDataModel>;

    constructor(data){
        this.page = new PageModel(data.page);
        this.defaultComponentDatas = [];
        if(!data.defaultComponentDatas){
            return;
        }
        for(let n = 0; n < data.defaultComponentDatas.length; n++){
            this.defaultComponentDatas.push(new ComponentDataModel(data.defaultComponentDatas[n]));
        }
    }
}