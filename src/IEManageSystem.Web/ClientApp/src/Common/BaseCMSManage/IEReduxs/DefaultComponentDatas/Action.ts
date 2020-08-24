// 默认组件数据更新
export const DefaultComponentDataUpdate = "DefaultComponentDataUpdate"
export class DefaultComponentDataUpdateAction{
    type = DefaultComponentDataUpdate;
    constructor(public pageId: number, public sign: string, public componentData: any){}
}