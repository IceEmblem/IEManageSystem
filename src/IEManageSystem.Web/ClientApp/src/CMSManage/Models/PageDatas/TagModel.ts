export default class TagModel{
    id: number;
    name: string;
    displayName: string;

    constructor(data:any){
        this.id = data.id;
        this.name = data.name;
        this.displayName = data.displayName;
    }
}