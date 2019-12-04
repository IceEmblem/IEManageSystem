import { TopLevelMenusSelect, SideMenuSelect } from './Actions'

function selectedTopMenu(state, action) 
{
    switch (action.type) 
    {
        case TopLevelMenusSelect:
            return action.menu
        default:
            return state
    }
}

function selectedSideMenu(state = null, action){
    switch(action.type){
        case SideMenuSelect:
            return action.menu
        default:
            return state;
    }
}

export function reducer(state = {}, action)
{
    return Object.assign({}, state, 
    {
        selectedTopMenu: selectedTopMenu(state.selectedTopMenu, action),
        selectedSideMenu: selectedSideMenu(state.selectedSideMenu, action)
    })
}