import SiteSettingConfig from "./SiteSettingConfig";

export default class SiteSettingGroupConfig
{
    constructor(public name: string, public displayName: string, public siteSettingConfigs: Array<SiteSettingConfig>)
    {
    }
}