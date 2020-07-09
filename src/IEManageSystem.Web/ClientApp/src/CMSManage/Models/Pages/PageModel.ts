import PageComponentModel from "./PageComponentModel";
import PageComponentCollection from "./PageComponentCollection";

export default class PageModel {
    public id: number;
    public name: string;
    public displayName: string;
    public description: string;
    public pageType: string;

    public get pageComponents() : Array<PageComponentModel>
    {
        return this._pageComponentCollection.pageComponents;
    }

    private _pageComponentCollection: PageComponentCollection = null;

    constructor(data?: any) 
    {
        this.id = data.id;
        this.name = data.name;
        this.displayName = data.displayName;
        this.description = data.description;
        this.pageType = data.pageType;

        let pageComponents: Array<PageComponentModel> = [];
        data.pageComponents.forEach((element: any) => {
            pageComponents.push(new PageComponentModel(element));
        });
        pageComponents.forEach(item => {
            let childs = pageComponents.filter(e => e.parentSign == item.sign);
            item.setChilds(childs);
        })

        this._pageComponentCollection = new PageComponentCollection(pageComponents.filter(e=>!e.parentSign));
    }

    addPageComponent(pageComponentData: PageComponentModel): void {
        if(pageComponentData.parentSign){
            let parent = this.getAllChilds().find(e=>e.sign == pageComponentData.parentSign);
            parent.addPageComponent(pageComponentData);

            return;
        }

        this._pageComponentCollection.addPageComponent(pageComponentData);
    }

    removePageComponent(pageComponentData: PageComponentModel): void {
        if(pageComponentData.parentSign){
            let parent = this.getAllChilds().find(e=>e.sign == pageComponentData.parentSign);
            parent.removePageComponent(pageComponentData);

            return;
        }

        this._pageComponentCollection.removePageComponent(pageComponentData);
    }

    editPageComponent(pageComponentData: PageComponentModel): void {
        let allComponents = this.getAllChilds();
        let pageComponents = allComponents.filter(e => e.sign == pageComponentData.sign);
        if(pageComponents.length > 1){
            throw Error(`标识已重复，Sign：${pageComponentData.sign}`);
        }

        if(pageComponentData.parentSign){
            let parent = allComponents.find(e=>e.sign == pageComponentData.parentSign);
            parent.childComponentsSort();

            return;
        }

        this._pageComponentCollection.pageComponentSort();
    }

    // 获取树下所有节点
    getAllChilds(): Array<PageComponentModel> {
        let childs = [...this.pageComponents];
        this.pageComponents.forEach(item => {
            childs = [...childs, ...item.getAllChilds()]
        })

        return childs;
    }

    toJsonObject() {
        return {
            id: this.id,
            name: this.name,
            displayName: this.displayName,
            description: this.description,
            pageType: this.pageType,
            pageComponents: this.getAllChilds().map(item=>item.toJsonObject())
        }
    }
}