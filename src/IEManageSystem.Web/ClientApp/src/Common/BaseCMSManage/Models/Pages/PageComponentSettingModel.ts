import DataCollectionBase from "../DataCollectionBase";

export const DefaultSettingName = 'DefaultSetting'

export const IEFontSetting = 'IEFontSetting';

export const IECommonStyleSetting = 'IECommonStyleSetting';

export default class PageComponentSettingModel extends DataCollectionBase 
{
    public name:string;
    public displayName:string;
}