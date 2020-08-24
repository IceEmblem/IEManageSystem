export const RootComponentSign = "__Root__";

// 组件动作
export abstract class ComponentAction {
  abstract type: string;
  abstract pageId: number;
}

export const PageAddComponent = 'PageAddComponent'
export class AddComponentAction extends ComponentAction {
  type = PageAddComponent;

  constructor(
    public pageId: number,
    public os: string,
    public pageComponent: any) {
    super();
  }
}

// 页面移除组件
export const PageRemoveComponent = 'PageRemoveComponent'
export class RemoveComponentAction extends ComponentAction {
  type = PageRemoveComponent;

  constructor(
    public pageId: number,
    public os: string,
    public pageComponentSign: string) {
    super();
  }
}

// 页面编辑组件
export const PageEditComponent = "PageEditComponent"
export class EditComponentAction extends ComponentAction {
  type = PageEditComponent;

  constructor(public pageId: number, public os: string, public pageComponentSign: string, public pageComponent: any) {
    super();
  }
}

// 从一个平台拷贝组件到另一个平台
export const CopyComponent = "CopyComponent"
export class CopyComponentAction extends ComponentAction {
  type = CopyComponent;

  constructor(public pageId: number, public distOS: string, public sourceOS) {
    super();
  }
}