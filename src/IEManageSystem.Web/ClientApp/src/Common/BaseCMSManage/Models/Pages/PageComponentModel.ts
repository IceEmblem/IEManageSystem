import PageComponentBaseSettingModel from "./PageComponentBaseSettingModel";
import PageComponentSettingModel from "./PageComponentSettingModel";
import PageLeafSettingModel from "./PageLeafSettingModel";

export const PageComponentOSType = {
    Web: "Web",
    Native: "Native"
}

export default class PageComponentModel {
    public id: number;
    public name: string;
    public sign: string;
    public parentSign: string | null;
    public group: string | null;
    public menuName: string | null;
    public componentTypes: number;
    public os: string;
    public pageComponentBaseSetting: PageComponentBaseSettingModel;
    public pageLeafSetting: PageLeafSettingModel;
    public pageComponentSettings: Array<PageComponentSettingModel>;
    public pageComponentSigns: Array<string>;

    getOrCreatePageComponentSetting(name: string): PageComponentSettingModel {
        let pageComponentSettingModel = this.pageComponentSettings.find(item=>item.name == name);
        if(pageComponentSettingModel){
            return pageComponentSettingModel;
        }

        pageComponentSettingModel = new PageComponentSettingModel();
        pageComponentSettingModel.id = 0;
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
}