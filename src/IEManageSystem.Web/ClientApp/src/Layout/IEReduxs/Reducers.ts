import { TopLevelMenusSelect, SideMenuSelect } from './Actions'
import Menu from 'Core/Menu/Menu';

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

export function reducer(state = {
    selectedTopMenu:null,
    selectedSideMenu:null

}, action:any)
{
    return Object.assign({}, state, 
    {
        selectedTopMenu: selectedTopMenu(state.selectedTopMenu, action),
        selectedSideMenu: selectedSideMenu(state.selectedSideMenu, action)
    })
}