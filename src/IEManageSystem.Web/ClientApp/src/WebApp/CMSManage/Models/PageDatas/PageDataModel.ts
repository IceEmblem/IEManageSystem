import TagModel from "./TagModel";

export default class PageDataModel{
    public id: number;
    public name :string;
    public title : string | null;
    public describe: string | null;
    public pageId : number;
    public content : string | null;
    public tags : Array<TagModel>;
    public images : string | null;
    public creationTime : Date;
    public score: number;
    public scoreNum: number;
    public click: number;

    public static CreatePageDataModel() : PageDataModel{
        let page = new PageDataModel();
        page.id = 0;
        // 不能更改页面名称，否则一些方法会认定为这是一个正常页面
        page.name = null;
        page.tags = [];
        return page;
    }

    public get imageList(){
        return this.images.split('|');
    }
}