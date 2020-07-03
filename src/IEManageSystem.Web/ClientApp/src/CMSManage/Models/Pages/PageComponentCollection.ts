import PageComponentModel from './PageComponentModel'

export default class PageComponentCollection {
    pageComponents: Array<PageComponentModel>;

    constructor(pageComponents: Array<PageComponentModel>) {
        this.pageComponents = pageComponents;

        this.pageComponentSort();
    }

    addPageComponent(pageComponent: PageComponentModel): void {
        if (this.pageComponents.some(e => e.sign == pageComponent.sign)) {
            throw new Error(`标识已重复，Sign：${pageComponent.sign}`);
        }

        let maxSortIndex = 0;
        if (this.pageComponents.length > 0) {
            maxSortIndex = this.pageComponents[this.pageComponents.length - 1].pageComponentBaseSetting.sortIndex;
        }

        pageComponent.pageComponentBaseSetting.sortIndex = maxSortIndex + 1;
        this.pageComponents = [...this.pageComponents, pageComponent]
    }

    removePageComponent(pageComponent: PageComponentModel): void {
        this.pageComponents = this.pageComponents.filter(item => item.sign != pageComponent.sign);
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
        this.pageComponents = [...this.pageComponents]
    }
}