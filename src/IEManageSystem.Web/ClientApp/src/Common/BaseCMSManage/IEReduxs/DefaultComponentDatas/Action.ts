// 默认组件数据更新
export const DefaultComponentDataUpdate = "DefaultComponentDataUpdate"
export class DefaultComponentDataUpdateAction{
    type = DefaultComponentDataUpdate;
    constructor(public pageName: string, public sign: string, public componentData: any){}
}

export const SetDefaultComponentDatas = "SetDefaultComponentDatas"
export class SetDefaultComponentDatasAction {
    type = SetDefaultComponentDatas;
    constructor(public pageName: string, public defaultComponentDatas: any){}
}