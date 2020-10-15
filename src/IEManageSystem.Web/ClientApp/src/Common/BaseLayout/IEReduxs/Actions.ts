import Menu from "BaseLayout/Menu/Menu";
import {createIEThunkAction} from 'Core/IEReduxs/Actions'

export const CreateTopLevelMenusReceive = "CreateTopLevelMenusReceive"
export function createTopLevelMenusFetch(){
  return createIEThunkAction(
    "/api/User/GetUserScopeAccessAuthorities",
    {},
    CreateTopLevelMenusReceive);
}