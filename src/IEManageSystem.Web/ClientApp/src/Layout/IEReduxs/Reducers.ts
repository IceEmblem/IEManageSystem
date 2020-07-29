import { TopLevelMenusSelect, SideMenuSelect, CreateTopLevelMenusReceive } from './Actions'
import MenuProvider from 'Layout/Menu/MenuProvider';
import Menu from 'Layout/Menu/Menu';
import { FetchAction } from 'Core/IEReduxs/Actions';
import ApiScopeAuthorityManager from 'Core/ApiScopeAuthority/ApiScopeAuthorityManager'

function selectedTopMenu(state:Menu | null, action:any) 
{
    switch (action.type) 
    {
        case TopLevelMenusSelect:
            return action.menu
        default:
            return state
    }
}

function selectedSideMenu(state:Menu | null = null, action:any){
    switch(action.type){
        case SideMenuSelect:
            return action.menu
        default:
            return state;
    }
}

function topLevelMenus(state: Array<Menu>, action: FetchAction) {
    if (action.type == CreateTopLevelMenusReceive) {
        let apiScopeAuthorityManager = new ApiScopeAuthorityManager(action.data.userScopeAccessAuthoritys);
        return MenuProvider.getTopLevelMenus(apiScopeAuthorityManager);
    }

    return state;
}

export function reducer(state = {
    selectedTopMenu:null,
    selectedSideMenu:null,
    topLevelMenus: MenuProvider.getTopLevelMenus(null),
}, action:any)
{
    return Object.assign({}, state, 
    {
        selectedTopMenu: selectedTopMenu(state.selectedTopMenu, action),
        selectedSideMenu: selectedSideMenu(state.selectedSideMenu, action),
        topLevelMenus: topLevelMenus(state.topLevelMenus, action)
    })
}