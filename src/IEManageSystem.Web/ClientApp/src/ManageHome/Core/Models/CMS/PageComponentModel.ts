interface PageComponentModel{
    name:string,
    sign:string,
    parentSign:string,
    col:string,
    height:string,
    padding:string,
    margin:string,
    backgroundColor:string,
    className:string,
    targetPageId:number | null,
    componentType:string,
    pageComponentSettings:Array<PageComponentSettingModel>
}