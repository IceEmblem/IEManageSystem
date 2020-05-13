export default class LogicModel {
    public id: number;
    public name: string;
    public code: string;

    constructor(data:any)
    {
        this.id = data.id;
        this.name = data.name;
        this.code = data.code;
    }
}