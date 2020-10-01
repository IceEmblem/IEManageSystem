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
    public parentSign: string | null;
    public group: string | null;
    public menuName: string | null;
    public os: string;
    public pageComponentBaseSetting: PageComponentBaseSettingModel;
    public pageLeafSetting: PageLeafSettingModel;
    public pageComponentSettings: Array<PageComponentSettingModel>;
    public pageComponentSigns: Array<string>;
    public field1Name: string;
    public field2Name: string;
    public field3Name: string;
    public field4Name: string;
    public field5Name: string;

    getOrCreatePageComponentSetting(name: string): PageComponentSettingModel {
        let pageComponentSettingModel = this.pageComponentSettings.find(item=>item.name == name);
        if(pageComponentSettingModel){
            return pageComponentSettingModel;
        }

        pageComponentSettingModel = new PageComponentSettingModel();
        pageComponentSettingModel.name = name;
        pageComponentSettingModel.displayName = name;
        pageComponentSettingModel.singleDatas = [];
        this.pageComponentSettings.push(pageComponentSettingModel);

        return pageComponentSettingModel;
    }

    replacePageComponentSetting(name: string, setting: PageComponentSettingModel){
        let findIndex = this.pageComponentSettings.findIndex(item=>item.name == name);
        if(findIndex < 0){
            this.pageComponentSettings.push(setting);
            return;
        }

        this.pageComponentSettings.splice(findIndex, 1, setting);
    }

    getPageComponentId(){
        return `__component__${this.os}__${this.sign}`
    }

    static createPageComponentId(os: string, sign: string){
        return `__component__${os}__${sign}`
    }

    static readonly RootComponentSign = "__Root__";
}