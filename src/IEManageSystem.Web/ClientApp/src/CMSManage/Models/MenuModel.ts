export default class MenuModel {
    public id: number;
    public name: string;
    public displayName: string;
    public icon: string;
    public pageName: string;
    public pageDataName: string;
    public menuType: string;
    public menus: Array<MenuModel>;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.displayName = data.displayName;
        this.icon = data.icon;
        this.pageName = data.pageName;
        this.pageDataName = data.pageDataName;
        this.menuType = data.menuType;

        this.menus = [];
        if (!data.menus) {
            return;
        }
        data.menus.forEach((element: any) => {
            this.menus.push(new MenuModel(element));
        });
    }

    isCompositeMenuType(): boolean {
        return this.menuType == "CompositeMenu";
    }

    isLeafMenu(): boolean {
        return this.menuType == "LeafMenu"
    };

    // 生成 url
    createUrl() {
        let url = "/Page";
        if (!this.pageName) {
            return url;
        }

        url = url + `/${this.pageName}`;
        if (!this.pageDataName) {
            return url;
        }

        url = url + `/${this.pageDataName}`;
        return url;
    }

    addChildMenu(menuData: any): void {
        if (!this.isCompositeMenuType()) {
            throw new Error("组合菜单才能添加子菜单");
        }

        if (!menuData.name || menuData.name == "") {
            throw new Error("菜单名称是必须的");
        }

        if (!menuData.menuType) {
            throw new Error("菜单类型是必须的");
        }

        if (this.menus.some(e => e.name == menuData.name)) {
            throw new Error("菜单名称以重复");
        }

        let childMenu = new MenuModel(menuData);
        this.menus.push(childMenu);
    }

    deleteChildMenu(menuData: any) {
        let index = this.menus.findIndex(e => e.name == menuData.name);

        if (index < 0) {
            throw new Error(`菜单${menuData.name}不存在`);
        }

        this.menus.splice(index, 1);
    }

    replaceChildMenu(menuName:string, menuData: any) {
        let index = this.menus.findIndex(e => e.name == menuName);

        if (index < 0) {
            throw new Error(`菜单${menuName}不存在`);
        }

        if (!menuData.name || menuData.name == "") {
            throw new Error("菜单名称是必须的");
        }

        if (menuData.menuType != this.menus[index].menuType) {
            throw new Error("不能更菜单类型");
        }

        let count = this.menus.filter(e => e.name == menuData.name).length;
        if (count > 1 || (count == 1 && this.menus.findIndex(e => e.name == menuData.name) != index)) {
            throw new Error("菜单名称已重复");
        }

        let childMenu = new MenuModel(menuData);
        this.menus.splice(index, 1, childMenu);
    }
}