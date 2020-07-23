import PageComponentBaseSettingModel from "./PageComponentBaseSettingModel";
import PageComponentSettingModel from "./PageComponentSettingModel";
import PageLeafSettingModel from "./PageLeafSettingModel";
import PageComponentCollection from "./PageComponentCollection";

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
}