import PageComponentModel from './PageComponentModel'

export default class PageComponentCollection {
    pageComponents: Array<PageComponentModel>;

    constructor(pageComponents: Array<PageComponentModel>) {
        this.pageComponents = pageComponents;

        this.pageComponentSort();
    }

    addPageComponent(pageComponentData: any): void {
        if (this.pageComponents.some(e => e.sign == pageComponentData.sign)) {
            throw new Error(`标识已重复，Sign：${pageComponentData.sign}`);
        }

        let newPageComponent = new PageComponentModel(pageComponentData);

        let maxSortIndex = 0;
        if (this.pageComponents.length > 0) {
            maxSortIndex = this.pageComponents[this.pageComponents.length - 1].pageComponentBaseSetting.sortIndex;
        }

        newPageComponent.pageComponentBaseSetting.sortIndex = maxSortIndex + 1;
        this.pageComponents = [...this.pageComponents, newPageComponent]
    }

    removePageComponent(pageComponentData: any): void {
        this.pageComponents = this.pageComponents.filter(item => item.sign != pageComponentData.sign);
    }

    editPageComponent(sign: string, pageComponentData: any): void {
        let needEditIndex = this.pageComponents.findIndex(e => e.sign == sign);
        if (needEditIndex < 0) {
            throw new Error(`未找到要编辑的组件，Sign：${sign}`);
        }
        if (sign != pageComponentData.sign && this.pageComponents.some(e => e.sign == pageComponentData.sign)) {
            throw new Error(`标识已重复，Sign：${pageComponentData.sign}`);
        }
        this.pageComponents[needEditIndex] = new PageComponentModel(pageComponentData);
        this.pageComponentSort();

        this.pageComponents = [...this.pageComponents]
    }

    // 获取树下所有节点
    getAllChilds(): Array<PageComponentModel> {
        let childs = [...this.pageComponents];
        this.pageComponents.forEach(item => {
            childs = [...childs, ...item.pageComponentCollection.getAllChilds()]
        })

        return childs;
    }

    pageComponentSort(): void {
        var len = this.pageComponents.length;
        var preIndex, current;
        for (var i = 1; i < len; i++) {
            preIndex = i - 1;
            current = this.pageComponents[i];
            while (preIndex >= 0 && this.pageComponents[preIndex].pageComponentBaseSetting.sortIndex > current.pageComponentBaseSetting.sortIndex) {
                this.pageComponents[preIndex + 1] = this.pageComponents[preIndex];
                preIndex--;
            }
            this.pageComponents[preIndex + 1] = current;
        }
    }
}