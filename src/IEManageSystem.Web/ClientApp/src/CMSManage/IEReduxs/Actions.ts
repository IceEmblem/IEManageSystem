import { createIEThunkAction } from 'Core/IEReduxs/Actions'

// 页面添加组件
export const PageAddComponent = 'PageAddComponent'
export function pageAddComponent(pageComponent:PageComponentModel) {
  return {
    type: PageAddComponent,
    pageComponent
  }
}

// 页面移除组件
export const PageRemoveComponent = 'PageRemoveComponent'
export function pageRemoveComponent(pageComponent:PageComponentModel) {
  return {
    type: PageRemoveComponent,
    pageComponent
  }
}

// 页面编辑组件
export const PageEditComponent = "PageEditComponent"
export function pageEditComponent(pageComponent:PageComponentModel) {
  return {
    type: PageEditComponent,
    pageComponent
  }
}

// 页面组件请求
export const PageReceive = "PageReceive"
export function pageFetch(name:string){
  let postData = {
    name: name
  };

  return createIEThunkAction(
    "/api/PageQuery/GetPage",
    postData,
    PageReceive
  );
}

// 页面组件更新
export const PageComponentUpdateReceive = "PageComponentUpdateReceive"
export function pageComponentUpdateFetch(name:string, components:PageComponentModel) {
  let postData = {
    name: name,
    pageComponents: components
  };

  return createIEThunkAction(
    "/api/PageManage/UpdatePageComponent",
    postData,
    PageComponentUpdateReceive
  );
}

// 文章数据请求
export const PageDataReceive = "PageDataReceive"
export function pageDataFetch(pageName:string, pageDataName:string){
  let postData = {
    pageName: pageName,
    pageDataName: pageDataName
  };

  return createIEThunkAction(
    "/api/PageQuery/GetPageData",
    postData,
    PageDataReceive
  );
}

// 文章数据更新请求
export const ComponentDataUpdateReceive = "ComponentDataUpdateReceive"
export function componentDataUpdateFetch(pageName:string, pageDataName:string, componentDatas:PageComponentModel)
{
  let postData = {
    pageName: pageName,
    pageDataName: pageDataName,
    componentDatas: componentDatas
  };

  return createIEThunkAction(
    "/api/PageManage/UpdateComponentData",
    postData,
    ComponentDataUpdateReceive
  );
}

// 文章组件数据更新
export const ComponentDataUpdate = "ComponentDataUpdate"
export function componentDataUpdate(resource: ContentComponentDataModel)
{
  return {
    type: ComponentDataUpdate,
    resource
  }
}