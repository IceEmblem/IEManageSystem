import {CreateTopLevelMenusReceive, FetchAction, GetSiteSettingsReceive} from './Actions'
import MenuProvider from 'Core/Menu/MenuProvider'
import ApiScopeAuthorityManager from 'Core/ApiScopeAuthority/ApiScopeAuthorityManager'
import Menu from 'Core/Menu/Menu';

function topLevelMenus(state:Array<Menu> = new MenuProvider().getTopLevelMenus(null), action: FetchAction)
{
    if(action.type == CreateTopLevelMenusReceive){
        let apiScopeAuthorityManager = new ApiScopeAuthorityManager(action.data.userScopeAccessAuthoritys);
        let menuProvider = new MenuProvider();
        return menuProvider.getTopLevelMenus(apiScopeAuthorityManager);
    }

    return state;
}

function siteSettings(state:Array<SiteSettingModel> = [], action: FetchAction){
    if(action.type == GetSiteSettingsReceive){
        return action.data.siteSettings;
    }

    return state;
}

export function reducer(
    state:any = {
        fecth: {
            fecthSign: 0,
            isFecth: false,
            isSuccess: true,
            error: null,
            isAuthorize: true
        },
        // 后台菜单
        topLevelMenus: undefined,
        // 站点设置
        siteSettings: undefined
    }, action: any) 
{
    return {
        ...state,
        ...{
            fecth: state.fecth,
            topLevelMenus: topLevelMenus(state.topLevelMenus, action),
            siteSettings: siteSettings(state.siteSettings, action)
        }
    }
}