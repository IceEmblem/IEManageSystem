export default class MenuModel{
    public id:number;
    public name:string;
    public displayName:string;
    public icon:string;
    public pageName:string;
    public pageDataName:string;
    public menus:Array<MenuModel>;

    constructor(data:any)
    {
        this.id = data.id;
        this.name = data.name;
        this.displayName = data.displayName;
        this.icon = data.icon;
        this.pageName = data.pageName;
        this.pageDataName = data.pageDataName;

        this.menus = [];
        data.menus.forEach((element:any) => {
            this.menus.push(new MenuModel(element));
        });
    }
}