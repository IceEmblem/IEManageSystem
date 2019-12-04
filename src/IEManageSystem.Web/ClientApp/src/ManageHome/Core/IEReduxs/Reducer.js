import {CreateTopLevelMenusReceive} from './Actions'
import MenuProvider from 'Core/Menu/MenuProvider'
import ApiScopeAuthorityManager from 'Core/ApiScopeAuthority/ApiScopeAuthorityManager'

function topLevelMenus(state = new MenuProvider().getTopLevelMenus(), action)
{
    if(action.type == CreateTopLevelMenusReceive){
        let apiScopeAuthorityManager = new ApiScopeAuthorityManager(action.value.userScopeAccessAuthoritys);
        let menuProvider = new MenuProvider();
        return menuProvider.getTopLevelMenus(apiScopeAuthorityManager);
    }

    return state;
}

export function reducer(
    state = {
        fecth: {
            fecthSign: 0,
            isFecth: false,
            isSuccess: true,
            error: null,
            isAuthorize: true
        }
    }, action) 
{
    return {
        ...state,
        ...{
            fecth: state.fecth,
            topLevelMenus: topLevelMenus(state.topLevelMenus, action)
        }
    }
}