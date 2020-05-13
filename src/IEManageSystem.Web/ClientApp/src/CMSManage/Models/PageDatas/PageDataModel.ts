import ContentComponentDataModel from "./ContentComponentDataModel";

export default class PageDataModel{
    public id: number;
    public name :string;
    public title : string | null;
    public contentComponentDatas:Array<ContentComponentDataModel>;

    constructor(data:any)
    {
        this.id = data.id;
        this.name = data.name;
        this.title = data.title;

        this.contentComponentDatas = [];
        data.contentComponentDatas.forEach((element:any) => {
            this.contentComponentDatas.push(new ContentComponentDataModel(element));
        });
    }

    updataComponentData(componentDataData: any){
        let componentData = new ContentComponentDataModel(componentDataData);

        let index = this.contentComponentDatas.findIndex(e => e.sign == componentData.sign);
        if (index == -1) {
            this.contentComponentDatas.push(componentData);
        }
        else {
            this.contentComponentDatas[index] = componentData;
        }
    }
}