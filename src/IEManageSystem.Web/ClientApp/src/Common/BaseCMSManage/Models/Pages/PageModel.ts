import EntityEdit from "../EntityEdit";

export const Discriminator = {
    page: "StaticPage",
    post: "ContentPage"
}

export default class PageModel {
    public name: string;
    public displayName: string;
    public description: string;
    public pageType: string;
    public creator: EntityEdit;
    public lastUpdater: EntityEdit;
    public discriminator: string;
}