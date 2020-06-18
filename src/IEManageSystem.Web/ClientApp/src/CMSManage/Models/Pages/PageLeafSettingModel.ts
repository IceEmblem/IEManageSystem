export default class PageLeafSettingModel {
    public pageName:string;
    public pageSize:number
    public top:number
    public searchKey:number

    constructor(data:any){
        this.pageName = data.pageName;
        this.pageSize = data.pageSize;
        this.top = data.top;
        this.searchKey = data.searchKey;
    }
}