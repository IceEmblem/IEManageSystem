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
    public imageList : Array<string> = [];
    public creationTime : Date;

    constructor(data:any)
    {
        this.id = data.id;
        this.name = data.name;
        this.title = data.title;
        this.describe = data.describe;
        this.content = data.content;
        this.creationTime = data.creationTime;

        this.tags = [];
        if(data.tags) {
            data.tags.forEach(element => {
                this.tags.push(new TagModel(element));
            });
        }

        this.images = data.images;
        if(this.images){
            this.imageList = this.images.split('|');
        }
        
        this.pageId = data.pageId;
    }
}