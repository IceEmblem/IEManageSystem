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
        page.name = "DefaultPost";
        page.tags = [];
        return page;
    }

    public get imageList(){
        return this.images.split('|');
    }
}