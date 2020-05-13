export default class PageComponentSettingModel {
    public id: number;
    public name:string;
    public displayName:string;
    public field1:string;
    public field2:string;
    public field3:string;
    public field4:string;
    public field5:string;

    constructor(data:any)
    {
        this.id = data.id;
        this.name = data.name;
        this.displayName = data.displayName;
        this.field1 = data.field1;
        this.field2 = data.field2;
        this.field3 = data.field3;
        this.field4 = data.field4;
        this.field5 = data.field5;
    }
}