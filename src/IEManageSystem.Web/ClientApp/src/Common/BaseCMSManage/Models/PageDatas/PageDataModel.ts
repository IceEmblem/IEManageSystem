import EntityEdit from "../EntityEdit";
import TagModel from "./TagModel";

export default class PageDataModel {
    public id: number;
    public name: string;
    public title: string | null;
    public describe: string | null;
    public pageId: number;
    public content: string | null;
    public tags: Array<TagModel>;
    public images: string | null;
    public creationTime: Date;
    public score: number;
    public scoreNum: number;
    public click: number;
    public field1: string;
    public field2: string;
    public field3: string;
    public field4: string;
    public field5: string;
    public creator: EntityEdit;
    public lastUpdater: EntityEdit;

    public static CreatePageDataModel(): PageDataModel {
        let page = new PageDataModel();
        page.id = 0;
        // 不能更改页面名称，否则一些方法会认定为这是一个正常页面
        page.name = null;
        page.tags = [];
        return page;
    }

    public get imageList() {
        if (!this.images) {
            return [];
        }

        return this.images.split('|');
    }

    public addImage(imagePath) {
        let imgs = this.imageList;
        imgs.push(imagePath);
        this.images = imgs.join('|');
    }

    public deleteImage(imagePath) {
        let imgs = this.imageList;
        let index = imgs.findIndex(e => e == imagePath);
        imgs.splice(index, 1);
        this.images = imgs.join('|');
    }
}