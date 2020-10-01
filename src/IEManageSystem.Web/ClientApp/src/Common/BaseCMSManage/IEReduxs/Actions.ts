import { createIEThunkAction } from 'Core/IEReduxs/Actions'
export * from './ContentComponentDatas/Action';
export * from './DefaultComponentDatas/Action';
export * from './PageComponents/Action';
export * from './Menus/Action'

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
  return createIEThunkAction(
    `/Pages/${name}.json`,
    null,
    PageReceive,
    "get",
    false
  );
}

// 该动作模拟页面接收动作
export const SetPage = 'SetPage'
export function setPage(page: any, pageComponents: Array<any>, defaultComponentDatas: Array<any>, os: string) {
  return {
    type: SetPage,
    data: {
      page,
      pageComponents,
      defaultComponentDatas,
      os
    }
  }
}

// 页面组件更新请求
export const PageComponentUpdateReceive = "PageComponentUpdateReceive"
export function pageComponentUpdateFetch(page: any, components: object, defaultComponentDatas: object) {
  // 清理失效的默认组件数据
  let fetchPageComponents = [];
  Object.values(components).forEach(osComponents => {
    fetchPageComponents = fetchPageComponents.concat(Object.values(osComponents))
  });
  let fetchDefaultComponentDatas = Object.values(defaultComponentDatas).filter(item => fetchPageComponents.some(e => e.sign == item.sign) && item.singleDatas.length > 0);

  let postData = {
    page: page,
    pageCompleteJson: JSON.stringify({
      page: page,
      pageComponents: fetchPageComponents,
      defaultComponentDatas: fetchDefaultComponentDatas
    })
  };

  return createIEThunkAction(
    "/api/PageManage/UpdatePage",
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