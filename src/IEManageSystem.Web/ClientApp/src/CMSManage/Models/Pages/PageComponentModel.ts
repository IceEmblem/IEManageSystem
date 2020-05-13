import PageComponentBaseSettingModel from "./PageComponentBaseSettingModel";
import PageComponentSettingModel from "./PageComponentSettingModel";

export default class PageComponentModel{
    public id:number;
    public name:string;
    public sign:string;
    public parentSign:string | null;
    public targetPageId:number | null;
    public componentType:string;
    public pageComponentBaseSetting:PageComponentBaseSettingModel;
    public pageComponentSettings:Array<PageComponentSettingModel>;

    constructor(data:any)
    {
        this.id = data.id;
        this.name = data.name;
        this.sign = data.sign;
        this.parentSign = data.parentSign;
        this.targetPageId = data.targetPageId;
        this.componentType = data.componentType;

        this.pageComponentBaseSetting = new PageComponentBaseSettingModel(data.pageComponentBaseSetting);

        this.pageComponentSettings = [];
        data.pageComponentSettings.forEach((element:any) => {
            this.pageComponentSettings.push(new PageComponentSettingModel(element));
        });
    }
}