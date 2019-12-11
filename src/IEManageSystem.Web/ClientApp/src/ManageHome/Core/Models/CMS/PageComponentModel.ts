interface PageComponentModel{
    name:string,
    sign:string,
    parentSign:string | null,
    col:string | null,
    height:string | null,
    padding:string | null,
    margin:string | null,
    backgroundColor:string | null,
    className:string | null,
    targetPageId:number | null,
    componentType:string,
    pageComponentSettings:Array<PageComponentSettingModel>
}