export default class PageLeafSettingModel {
    public pageName:string = "";
    public pageSize:number = 10;
    public top:number = 0
    public searchKey:string = "";
    public orderby: string = "";

    constructor(data:any){
        if(!data){
            return;
        }
        this.pageName = data.pageName;
        this.pageSize = data.pageSize;
        this.top = data.top;
        this.searchKey = data.searchKey;
        this.orderby = data.orderby;
    }
}