import Menu from "Core/Menu/Menu";

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