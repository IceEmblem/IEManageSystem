import SiteSettingModel from '../Models/SiteSettingModel';
import { GetSiteSettingsReceive } from './Actions'
import { FetchAction } from 'Core/IEReduxs/Actions'

function siteSettings(state: Array<SiteSettingModel> = [], action: FetchAction) {
    if (action.type == GetSiteSettingsReceive) {
        return action.data.siteSettings;
    }

    return state;
}

export function reducer(
    state: any = {
        // 站点设置
        siteSettings: undefined
    }, action: any) {
    return {
        siteSettings: siteSettings(state.siteSettings, action)
    }
}