import Menu from "./Menu";
import ApiScopeAuthorityManager from "Core/ApiScopeAuthority/ApiScopeAuthorityManager";

// 导航栏菜单
interface NavMenuComponent{
    menu:Menu,
    baseUrl:string,
    // 组件类型，该菜单对应的组件
    component:any
}

var navMenuComponents:Array<NavMenuComponent> = [];

export default class MenuProvider {
    // 注册导航栏菜单
    static registerMenu(menu:Menu, baseUrl:string, component:any) {
        navMenuComponents.push({
            menu,
            baseUrl,
            component
        });
    }

    // 是否使用授权来过滤菜单
    enableAuthorityFilter: boolean;

    constructor() {
        this.enableAuthorityFilter = false;
    }

    // 生成菜单
    private createMenu(menuData:Menu, apiScopeAuthorityManager:ApiScopeAuthorityManager | null) {
        let menu = new Menu();
        menu.id = menuData.id;
        menu.text = menuData.text;
        menu.url = menuData.url;
        menu.default = menuData.default;
        menu.icon = menuData.icon;
        menu.accessScope = menuData.accessScope;

        // 如果不允许访问这个菜单，则访问null
        if (apiScopeAuthorityManager && this.isAllowAccessMenu(menu, apiScopeAuthorityManager) == false) {
            return null;
        }

        // 如果菜单为节点菜单，则返回这个菜单
        if (menuData.menuItems == undefined || menuData.menuItems == null) {
            return menu;
        }

        for (let item in menuData.menuItems) {
            let childMenu = this.createMenu(menuData.menuItems[item], apiScopeAuthorityManager);
            if (childMenu != null) {
                menu.menuItems.push(childMenu);
            }
        }

        // 如果菜单不为节点菜单，但又没有子项，返回null
        if (menu.menuItems.length == 0) {
            return null;
        }

        return menu;
    }

    // 是否允许访问菜单
    private isAllowAccessMenu(menu:Menu, apiScopeAuthorityManager:ApiScopeAuthorityManager)
    {
        // 如果没有指定需求的域，则允许访问
        if(menu.accessScope === undefined){
            return true;
        }

        for(let item in menu.accessScope)
        {
            // 如果需求的域中其中一个没有访问权限，则没有这个菜单的访问权限
            if(apiScopeAuthorityManager.isAllowAccessScope(menu.accessScope[item]) === false)
            {
                return false;   
            }
        }

        return true;
    }

    // ApiScopeAuthorityManager（api域权限管理器）类型
    getTopLevelMenus(apiScopeAuthorityManager:ApiScopeAuthorityManager | null) {
        let menu = new Menu();
        menu.menuItems = navMenuComponents.map(item => item.menu);
        if(this.enableAuthorityFilter == false){
            return menu.menuItems;
        }

        let mainMenu = this.createMenu(menu, apiScopeAuthorityManager);
        if (mainMenu == null) {
            mainMenu = new Menu();
        }
        return mainMenu.menuItems;
    }

    getNavMenuComponents() {
        return navMenuComponents;
    }
}