interface PageComponentModel{
    id:number,
    name:string,
    sign:string,
    parentSign:string | null,
    pageComponentBaseSetting:PageComponentBaseSettingModel,
    targetPageId:number | null,
    componentType:string,
    pageComponentSettings:Array<PageComponentSettingModel>
}