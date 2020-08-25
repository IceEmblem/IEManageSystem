import { CreateTopLevelMenusReceive } from './Actions'
import MenuProvider from 'BaseLayout/Menu/MenuProvider';
import Menu from 'BaseLayout/Menu/Menu';
import { FetchAction } from 'Core/IEReduxs/Actions';
import ApiScopeAuthorityManager from 'Core/ApiScopeAuthority/ApiScopeAuthorityManager'

function topLevelMenus(state: Array<Menu>, action: FetchAction) {
    if (action.type == CreateTopLevelMenusReceive) {
        let apiScopeAuthorityManager = new ApiScopeAuthorityManager(action.data.userScopeAccessAuthoritys);
        return MenuProvider.getTopLevelMenus(apiScopeAuthorityManager);
    }

    return state;
}

export function reducer(state = {
    topLevelMenus: MenuProvider.getTopLevelMenus(null),
}, action:any)
{
    return Object.assign({}, state, 
    {
        topLevelMenus: topLevelMenus(state.topLevelMenus, action)
    })
}