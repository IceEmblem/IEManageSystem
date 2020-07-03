import PageComponentBaseSettingModel from "./PageComponentBaseSettingModel";
import PageComponentSettingModel from "./PageComponentSettingModel";
import PageLeafSettingModel from "./PageLeafSettingModel";
import PageComponentCollection from "./PageComponentCollection";

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

    public pageComponentCollection: PageComponentCollection = new PageComponentCollection([]);

    constructor(data:any)
    {
        this.id = data.id;
        this.name = data.name;
        this.sign = data.sign;
        this.parentSign = data.parentSign;
        this.menuName = data.menuName;
        this.componentType = data.componentType;

        this.pageComponentBaseSetting = new PageComponentBaseSettingModel(data.pageComponentBaseSetting);
        this.pageLeafSetting = new PageLeafSettingModel(data.pageLeafSetting);
        
        this.pageComponentSettings = [];
        data.pageComponentSettings.forEach((element:any) => {
            this.pageComponentSettings.push(new PageComponentSettingModel(element));
        });
    }

    addPageComponent(pageComponentData: any): void {
        this.pageComponentCollection.addPageComponent(pageComponentData);
    }

    removePageComponent(pageComponentData: any): void {
        this.pageComponentCollection.removePageComponent(pageComponentData);
    }

    editPageComponent(sign: string, pageComponentData: any): void {
        this.pageComponentCollection.editPageComponent(sign, pageComponentData);
    }

    public toJsonObject(){
        return {
            id: this.id,
            name: this.name,
            sign: this.sign,
            parentSign: this.parentSign,
            menuName: this.menuName,
            componentType: this.componentType,
            pageComponentBaseSetting: this.pageComponentBaseSetting,
            pageLeafSetting: this.pageLeafSetting,
            pageComponentSettings: this.pageComponentSettings
        }
    }
}