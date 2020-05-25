import ContentComponentDataModel from "../ComponentDataModel";

export default class PageDataModel{
    public id: number;
    public name :string;
    public title : string | null;

    constructor(data:any)
    {
        this.id = data.id;
        this.name = data.name;
        this.title = data.title;
    }
}