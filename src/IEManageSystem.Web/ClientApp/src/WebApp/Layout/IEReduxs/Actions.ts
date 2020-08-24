import Menu from "Core/Menu/Menu";
import {createIEThunkAction} from 'Core/IEReduxs/Actions'

export const TopLevelMenusSelect = 'TopLevelMenusSelect'
export function topLevelMenusSelect(menu:Menu) 
{
  return {
    type: TopLevelMenusSelect,
    menu
  }
}

export const SideMenuSelect = 'SideMenuSelect';
export function sideMenuSelect(menu:Menu){
  return {
    type: SideMenuSelect,
    menu
  }
}

export const CreateTopLevelMenusReceive = "CreateTopLevelMenusReceive"
export function createTopLevelMenusFetch(){
  return createIEThunkAction(
    "/api/User/GetUserScopeAccessAuthorities",
    {},
    CreateTopLevelMenusReceive);
}