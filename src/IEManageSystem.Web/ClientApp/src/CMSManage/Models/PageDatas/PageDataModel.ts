import ContentComponentDataModel from "../ComponentDataModel";

export default class PageDataModel{
    public id: number;
    public name :string;
    public title : string | null;
    public pageId : number;
    public content : string | null;
    public tags : string | null;
    public tagList : Array<string> = [];
    public images : string | null;
    public imageList : Array<string> = [];

    constructor(data:any)
    {
        this.id = data.id;
        this.name = data.name;
        this.title = data.title;
        this.content = data.content;

        this.tags = data.tags;
        if(this.tags){
            this.tagList = this.tags.split('|');
        }

        this.images = data.images;
        if(this.images){
            this.imageList = this.images.split('|');
        }
        
        this.pageId = data.pageId;
    }
}