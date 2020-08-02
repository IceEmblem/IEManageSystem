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
    public pageComponent: any,
    public isAddDefaultComponentData: string) {
    super();
  }
}

// 页面移除组件
export const PageRemoveComponent = 'PageRemoveComponent'
export class RemoveComponentAction extends ComponentAction {
  type = PageRemoveComponent;

  constructor(
    public pageId: number,
    public pageComponentSign: string) {
    super();
  }
}

// 页面编辑组件
export const PageEditComponent = "PageEditComponent"
export class EditComponentAction extends ComponentAction {
  type = PageEditComponent;

  constructor(public pageId: number, public pageComponentSign: string, public pageComponent: any) {
    super();
  }
}

// export const SnapshotOfComponent = "SnapshotOfComponent"
// export class snapshotOfComponent extends ComponentAction {
//   type = SnapshotOfComponent;

//   constructor(public pageId: number, public pageComponentSign: string) {
//     super();
//   }
// }

// export const ResumeSnapshotOfComponent = "ResumeSnapshotOfComponent";
// export class resumeSnapshotOfComponent extends ComponentAction {
//   type = ResumeSnapshotOfComponent;

//   constructor(public pageId: number, public pageComponentSign: string) {
//     super();
//   }
// }