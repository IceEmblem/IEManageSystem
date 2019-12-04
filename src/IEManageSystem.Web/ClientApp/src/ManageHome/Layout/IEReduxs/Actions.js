export const TopLevelMenusSelect = 'TopLevelMenusSelect'
export function topLevelMenusSelect(menu) 
{
  return {
    type: TopLevelMenusSelect,
    menu
  }
}

export const SideMenuSelect = 'SideMenuSelect';
export function sideMenuSelect(menu){
  return {
    type: SideMenuSelect,
    menu
  }
}