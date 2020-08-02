import PageComponentBaseSettingModel from "./PageComponentBaseSettingModel";
import PageComponentSettingModel from "./PageComponentSettingModel";
import PageLeafSettingModel from "./PageLeafSettingModel";

export default class PageComponentModel {
    public id: number;
    public name: string;
    public sign: string;
    public parentSign: string | null;
    public menuName: string | null;
    public componentType: string;
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

        return pageComponentSettingModel;
    }
}