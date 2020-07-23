import { createIEThunkAction } from '../../Core/IEReduxs/Actions'
import { ComponentDataUpdateAction } from './ContentComponentDatas/Action';
import { DefaultComponentDataUpdateAction } from './DefaultComponentDatas/Action';
import {
  AddComponentAction, 
  RemoveComponentAction,
  EditComponentAction,
  RootComponentSign
} from './PageComponents/Action';

export {
  ComponentDataUpdateAction,
  DefaultComponentDataUpdateAction,
  AddComponentAction, 
  RemoveComponentAction,
  EditComponentAction,
  RootComponentSign
}

// 设置当前活跃的组件
export const SetActiveComponent = "SetActiveComponent";
export function setActiveComponent(activePageComponentSign: string) {
  return {
    type: SetActiveComponent,
    activePageComponentSign
  }
}

// 页面组件请求
export const PageReceive = "PageReceive"
export function pageFetch(name: string) {
  let postData = {
    name: name
  };

  return createIEThunkAction(
    "/api/PageQuery/GetPage",
    postData,
    PageReceive
  );
}

// 该动作模拟页面接收动作
export function setPage(page: any, pageComponents: Array<any>, defaultComponentDatas: Array<any>) {
  return {
    type: PageReceive,
    data: {
      page,
      pageComponents,
      defaultComponentDatas
    }
  }
}

// 页面组件更新请求
export const PageComponentUpdateReceive = "PageComponentUpdateReceive"
export function pageComponentUpdateFetch(name: string, components: object, defaultComponentDatas: object) {
  let postData = {
    name: name,
    pageComponents: Object.values(components),
    defaultComponentDatas: Object.values(defaultComponentDatas)
  };

  return createIEThunkAction(
    "/api/PageManage/UpdatePageComponent",
    postData,
    PageComponentUpdateReceive
  );
}

// 文章数据请求
export const PageDataReceive = "PageDataReceive"
export function pageDataFetch(pageName: string, pageDataName: string) {
  let postData = {
    pageName: pageName,
    pageDataName: pageDataName
  };

  return createIEThunkAction(
    "/api/PageDataQuery/GetPageData",
    postData,
    PageDataReceive
  );
}

// 文章组件数据更新请求
export const ComponentDataUpdateReceive = "ComponentDataUpdateReceive"
export function componentDataUpdateFetch(pageName: string, pageDataName: string, componentDatas: object) {
  let postData = {
    pageName: pageName,
    pageDataName: pageDataName,
    componentDatas: Object.values(componentDatas)
  };

  return createIEThunkAction(
    "/api/PageDataManage/UpdateComponentData",
    postData,
    ComponentDataUpdateReceive
  );
}