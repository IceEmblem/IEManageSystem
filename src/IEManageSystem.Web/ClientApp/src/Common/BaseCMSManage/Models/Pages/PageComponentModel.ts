import PageComponentBaseSettingModel from "./PageComponentBaseSettingModel";
import PageComponentSettingModel from "./PageComponentSettingModel";
import PageLeafSettingModel from "./PageLeafSettingModel";

export const PageComponentOSType = {
    Web: "Web",
    Native: "Native"
}

export default class PageComponentModel {
    public name: string;
    public sign: string;
    public parentSign: string | undefined;
    public group: string | undefined;
    public menuName: string | undefined;
    public os: string;
    public pageComponentBaseSetting: PageComponentBaseSettingModel;
    public pageLeafSetting: PageLeafSettingModel;
    public pageComponentSettings: Map<string, PageComponentSettingModel>;
    public pageComponentSigns: Array<string>;
    public field1Name: string;
    public field2Name: string;
    public field3Name: string;
    public field4Name: string;
    public field5Name: string;

    getOrCreatePageComponentSetting(name: string): PageComponentSettingModel {
        let pageComponentSettingModel = this.pageComponentSettings[name];
        if(pageComponentSettingModel){
            return pageComponentSettingModel;
        }

        pageComponentSettingModel = new PageComponentSettingModel();
        pageComponentSettingModel.name = name;
        pageComponentSettingModel.displayName = name;
        this.pageComponentSettings[name] = pageComponentSettingModel;

        return pageComponentSettingModel;
    }

    replacePageComponentSetting(name: string, setting: PageComponentSettingModel){
        this.pageComponentSettings[name] = setting;
    }

    getPageComponentId(){
        return `__component__${this.os}__${this.sign}`
    }

    static createPageComponentId(os: string, sign: string){
        return `__component__${os}__${sign}`
    }

    static readonly RootComponentSign = "__Root__";
}