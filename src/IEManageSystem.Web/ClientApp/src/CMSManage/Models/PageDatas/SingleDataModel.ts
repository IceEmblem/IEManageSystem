export default class SingleDataModel{
    public id: number;
    public name:string;
    public sortIndex: number;
    public field1:string | null;
    public field2:string | null;
    public field3:string | null;
    public field4:string | null;
    public field5:string | null;

    constructor(data:any)
    {
        this.id = data.id;
        this.name = data.name;
        this.sortIndex = data.sortIndex;
        this.field1 = data.field1;
        this.field2 = data.field2;
        this.field3 = data.field3;
        this.field4 = data.field4;
        this.field5 = data.field5;
    }
}