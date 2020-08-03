export default class PictureModel{
    public webPath:string;
    public name:string;
    public isDir:boolean;

    constructor(data:any)
    {
        this.webPath = data.webPath;
        this.name = data.name;
        this.isDir = data.isDir;
    }
}