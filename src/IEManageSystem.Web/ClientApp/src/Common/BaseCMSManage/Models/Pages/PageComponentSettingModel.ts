import DataCollectionBase from "../DataCollectionBase";

export const DefaultSettingName = 'DefaultSetting'

export const IEFontSetting = 'IEFontSetting';

export default class PageComponentSettingModel extends DataCollectionBase 
{
    public id: number;
    public name:string;
    public displayName:string;
}