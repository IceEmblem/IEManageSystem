export default class MenuModel {
    public id: number;
    public name: string;
    public displayName: string;
    public icon: string;
    public pageName: string;
    public pageDataName: string;
    public menuType: string;
    public menus: Array<MenuModel> = [];

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

        menuData.__proto__ =  MenuModel.prototype;
        if(!this.menus) {
            this.menus = [];
        }
        this.menus.push(menuData);
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

        menuData.__proto__ =  MenuModel.prototype;
        this.menus.splice(index, 1, menuData);
    }
}