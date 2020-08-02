import Page from "./Page";

class PageProvider {
    pages:Array<Page> = [];

    register(page:Page)
    {
        this.addAndSort(page);
    }

    private addAndSort(page:Page){
        let index = this.pages.findIndex(item => page.url.startsWith(item.url));
        if(index >= 0){
            this.pages.splice(index, 0, page);
            return;
        }
        
        this.pages.push(page);
    }
}

const pageProvider = new PageProvider();

export default pageProvider;