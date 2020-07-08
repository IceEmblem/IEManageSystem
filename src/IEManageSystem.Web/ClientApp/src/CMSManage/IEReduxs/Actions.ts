import { createIEThunkAction } from 'Core/IEReduxs/Actions'
import PageModel from '../Models/Pages/PageModel'
import PageComponentModel from 'CMSManage/Models/Pages/PageComponentModel'
import ComponentDataModel from 'CMSManage/Models/ComponentDataModel'

// 页面添加组件
export const PageAddComponent = 'PageAddComponent'
export function pageAddComponent(pageComponent:PageComponentModel, isAddDefaultComponentData) {
  return {
    type: PageAddComponent,
    pageComponent,
    isAddDefaultComponentData
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

// 该动作模拟页面接收动作
export function setPage(page:PageModel, defaultComponentDatas:Array<ComponentDataModel>){
  return {
    type: PageReceive,
    data: {
      page,
      defaultComponentDatas
    }
  }
}

// 页面组件更新
export const PageComponentUpdateReceive = "PageComponentUpdateReceive"
export function pageComponentUpdateFetch(name:string, components:Array<PageComponentModel>, defaultComponentDatas:Array<ComponentDataModel>) {
  let postData = {
    name: name,
    pageComponents: components.map(item=>item.toJsonObject()),
    defaultComponentDatas: defaultComponentDatas
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
    "/api/PageDataQuery/GetPageData",
    postData,
    PageDataReceive
  );
}

// 清理文章数据（如果页面是静态页，则文章没有数据，这时候应该清理文章）
export const PageDataClear = "PageDataClear";
export function pageDataClear(){
  return {
    type: PageDataClear
  }
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
    "/api/PageDataManage/UpdateComponentData",
    postData,
    ComponentDataUpdateReceive
  );
}

// 文章组件数据更新
export const ComponentDataUpdate = "ComponentDataUpdate"
export function componentDataUpdate(resource: ComponentDataModel)
{
  return {
    type: ComponentDataUpdate,
    resource
  }
}

// 默认组件数据更新
export const DefaultComponentDataUpdate = "DefaultComponentDataUpdate"
export function defaultComponentDataUpdate(resource: ComponentDataModel)
{
  return {
    type: DefaultComponentDataUpdate,
    resource
  }
}