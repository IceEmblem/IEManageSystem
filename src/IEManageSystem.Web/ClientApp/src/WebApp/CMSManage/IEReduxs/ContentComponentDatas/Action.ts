// 文章组件数据更新
export const ComponentDataUpdate = "ComponentDataUpdate"
export class ComponentDataUpdateAction {
    type = ComponentDataUpdate;
    constructor(public pageDataId: number, public componentData: any){}
}