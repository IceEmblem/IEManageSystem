export default interface MenuModel{
    id:number,
    name:string,
    displayName:string,
    icon:string,
    pageName:string,
    pageDataName:string,
    menus:Array<MenuModel>
}