import { FetchAction, GetSiteSettingsReceive } from './Actions'

function siteSettings(state: Array<SiteSettingModel> = [], action: FetchAction) {
    if (action.type == GetSiteSettingsReceive) {
        return action.data.siteSettings;
    }

    return state;
}

export interface FetchData {
    fecthSign: number,
    isFecthing: boolean,
    isSuccess: boolean,
    error: string,
    isAuthorize: boolean
}

export function reducer(
    state: any = {
        // 类型 FetchData
        fecths: [],
        // 站点设置
        siteSettings: undefined
    }, action: any) {
    return {
        ...state,
        ...{
            fecths: state.fecths,
            siteSettings: siteSettings(state.siteSettings, action)
        }
    }
}