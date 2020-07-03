import PageComponentModel from "./PageComponentModel";
import PageComponentCollection from "./PageComponentCollection";

export default class PageModel {
    public id: number;
    public name: string;
    public displayName: string;
    public description: string;
    public pageType: string;
    // public pageComponents: Array<PageComponentModel>;

    public pageComponentCollection: PageComponentCollection = null;

    public pageComponents: Map<string, PageComponentModel> = new Map<string, PageComponentModel>();

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
            item.pageComponentCollection = new PageComponentCollection(childs);
        })

        this.pageComponentCollection = new PageComponentCollection(pageComponents.filter(e=>!e.parentSign));
    }

    getRootPageComponents(){
        return this.pageComponentCollection.pageComponents;
    }

    addPageComponent(pageComponentData: PageComponentModel): void {
        if(pageComponentData.parentSign){
            let parent = this.getAllChilds().find(e=>e.sign == pageComponentData.parentSign);
            parent.addPageComponent(pageComponentData);

            return;
        }

        this.pageComponentCollection.addPageComponent(pageComponentData);
    }

    removePageComponent(pageComponentData: PageComponentModel): void {
        if(pageComponentData.parentSign){
            let parent = this.getAllChilds().find(e=>e.sign == pageComponentData.parentSign);
            parent.removePageComponent(pageComponentData);

            return;
        }

        this.pageComponentCollection.removePageComponent(pageComponentData);
    }

    editPageComponent(sign: string, pageComponentData: PageComponentModel): void {
        if(pageComponentData.parentSign){
            let parent = this.getAllChilds().find(e=>e.sign == pageComponentData.parentSign);
            parent.editPageComponent(sign, pageComponentData);

            return;
        }

        this.pageComponentCollection.editPageComponent(sign, pageComponentData);
    }

    getAllChilds(){
        return this.pageComponentCollection.getAllChilds();
    }

    toJsonObject() {
        return {
            id: this.id,
            name: this.name,
            displayName: this.displayName,
            description: this.description,
            pageType: this.pageType,
            pageComponents: this.pageComponents.map(item=>item.toJsonObject())
        }
    }
}