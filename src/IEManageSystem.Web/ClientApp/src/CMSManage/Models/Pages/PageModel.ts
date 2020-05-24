import PageComponentModel from "./PageComponentModel";

export default class PageModel{
    public id:number;
    public name:string;
    public displayName:string;
    public description:string;
    public pageType:string;
    public pageComponents:Array<PageComponentModel>;

    constructor(data?:any)
    {
        this.id = data.id;
        this.name = data.name;
        this.displayName = data.displayName;
        this.description = data.description;
        this.pageType = data.pageType;

        this.pageComponents = [];
        data.pageComponents.forEach((element:any) => {
            this.pageComponents.push(new PageComponentModel(element));
        });
        this.pageComponentSort();
    }
    
    addPageComponent(pageComponentData:any):void
    {
        let newPageComponent = new PageComponentModel(pageComponentData);

        if(this.pageComponents.some(e=>e.sign == pageComponentData.sign)){
            throw new Error(`标识已重复，Sign：${pageComponentData.sign}`);
        }

        let maxSortIndex = 0;
        if(this.pageComponents.length > 0){
            maxSortIndex = this.pageComponents[this.pageComponents.length - 1].pageComponentBaseSetting.sortIndex;
        }
        
        newPageComponent.pageComponentBaseSetting.sortIndex = maxSortIndex + 1;
        this.pageComponents.push(newPageComponent);
    }

    removePageComponent(pageComponentData:any):void{
        this.pageComponents = this.pageComponents.filter(item => item.sign != pageComponentData.sign);
    }

    editPageComponent(sign:string, pageComponentData:any):void{
        let needEditIndex = this.pageComponents.findIndex(e=>e.sign == sign);
        if(needEditIndex < 0){
            throw new Error(`未找到要编辑的组件，Sign：${sign}`);
        }
        if(sign != pageComponentData.sign && this.pageComponents.some(e=>e.sign == pageComponentData.sign)){
            throw new Error(`标识已重复，Sign：${pageComponentData.sign}`);
        }
        this.pageComponents[needEditIndex] = new PageComponentModel(pageComponentData);
        this.pageComponentSort();
    }

    pageComponentSort() : void {
        var len = this.pageComponents.length;
        var preIndex, current;
        for (var i = 1; i < len; i++) {
            preIndex = i - 1;
            current = this.pageComponents[i];
            while(preIndex >= 0 && this.pageComponents[preIndex].pageComponentBaseSetting.sortIndex > current.pageComponentBaseSetting.sortIndex) {
                this.pageComponents[preIndex+1] = this.pageComponents[preIndex];
                preIndex--;
            }
            this.pageComponents[preIndex+1] = current;
        }
    }
}