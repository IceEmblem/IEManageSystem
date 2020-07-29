import { createIEThunkAction } from '../../../Core/IEReduxs/Actions'

// 页面组件请求
export const MenuReceive = "MenuReceive"
export function menuFetch(menuName: string) {
  let postData = {
    menuName: menuName
  };

  return createIEThunkAction(
    "/api/Menu/GetMenu",
    postData,
    MenuReceive
  );
}

export const UpdateMenu = "UpdateMenu"
export class UpdateMenuAction{
  constructor(public menu: any){}
}