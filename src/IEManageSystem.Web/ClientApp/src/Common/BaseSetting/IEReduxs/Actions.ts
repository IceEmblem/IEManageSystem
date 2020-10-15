import {createIEThunkAction} from 'Core/IEReduxs/Actions'

export const GetSiteSettingsReceive = "GetSiteSettingsReceive";
export function getSiteSettingsFetch(){
  return createIEThunkAction(
    "/api/SiteSettingQuery/GetSiteSettings",
    {},
    GetSiteSettingsReceive);
}