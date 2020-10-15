import SiteSettingGroupConfig from "./SiteSettingGroupConfig";
import SiteSettingConfig from "./SiteSettingConfig";
import SiteSettingModel from "../Models/SiteSettingModel";

// 站点设置管理器
export default class SiteSettingManager {
    static baseSiteSettingName: string = "BaseSiteSetting";
    static siteNameSettingKey: string = "SiteName";
    static siteLogoSettingKey: string = "SiteLogo";

    static siteSettingGroupConfigs: Array<SiteSettingGroupConfig> = [
        new SiteSettingGroupConfig(SiteSettingManager.baseSiteSettingName, "基本设置", [
            new SiteSettingConfig(SiteSettingManager.siteNameSettingKey, "站点名称"),
            new SiteSettingConfig(SiteSettingManager.siteLogoSettingKey, "站点Logo"),
        ])];

    siteSettings: Array<SiteSettingModel> = [];

    // 如果模块需要站点设置，那么可以向提供者添加设置配置
    static registerSettingConfig(siteSettingGroupConfig: SiteSettingGroupConfig) {
        this.siteSettingGroupConfigs.push(siteSettingGroupConfig);
    }

    constructor(siteSettings: Array<SiteSettingModel>) {
        this.siteSettings = siteSettings;
    }

    getSetting(groupName:string, key:string){
        return this.siteSettings.find(item=>item.group == groupName && item.key == key);
    }

    getSiteName() {
        let setting = this.siteSettings.find(item =>
            item.group == SiteSettingManager.baseSiteSettingName
            && item.key == SiteSettingManager.siteNameSettingKey);

        if (!setting) {
            return "IceEmblem";
        }

        return setting.value;
    }

    getSiteLogo() {
        let setting = this.siteSettings.find(item =>
            item.group == SiteSettingManager.baseSiteSettingName
            && item.key == SiteSettingManager.siteLogoSettingKey);

        if (!setting) {
            return "";
        }

        return setting.value;
    }
}