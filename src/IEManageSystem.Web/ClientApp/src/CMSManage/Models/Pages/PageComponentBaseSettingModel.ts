export default class PageComponentBaseSettingModel{
    public id: number;
    public sortIndex: number;
    public col: string | null;
    public height: string | null;
    public padding: string | null;
    public margin: string | null;
    public backgroundColor: string | null;
    public className: string | null;

    constructor(data:any)
    {
        this.id = data.id;
        this.sortIndex = data.sortIndex;
        this.col = data.col;
        this.height = data.height;
        this.padding = data.padding;
        this.margin = data.margin;
        this.backgroundColor = data.backgroundColor;
        this.className = data.className;
    }
}