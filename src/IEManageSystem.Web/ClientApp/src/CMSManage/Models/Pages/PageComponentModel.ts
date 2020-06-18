import PageComponentBaseSettingModel from "./PageComponentBaseSettingModel";
import PageComponentSettingModel from "./PageComponentSettingModel";
import PageLeafSettingModel from "./PageLeafSettingModel";

export default class PageComponentModel{
    public id:number;
    public name:string;
    public sign:string;
    public parentSign:string | null;
    public menuName:string | null;
    public componentType:string;
    public pageComponentBaseSetting:PageComponentBaseSettingModel;
    public pageLeafSetting:PageLeafSettingModel;
    public pageComponentSettings:Array<PageComponentSettingModel>;

    constructor(data:any)
    {
        this.id = data.id;
        this.name = data.name;
        this.sign = data.sign;
        this.parentSign = data.parentSign;
        this.menuName = data.menuName;
        this.componentType = data.componentType;

        this.pageComponentBaseSetting = new PageComponentBaseSettingModel(data.pageComponentBaseSetting);
        if(data.pageLeafSetting){
            this.pageLeafSetting = new PageLeafSettingModel(data.pageLeafSetting);
        }
        
        this.pageComponentSettings = [];
        data.pageComponentSettings.forEach((element:any) => {
            this.pageComponentSettings.push(new PageComponentSettingModel(element));
        });
    }
}