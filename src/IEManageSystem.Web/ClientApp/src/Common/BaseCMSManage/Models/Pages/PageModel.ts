import EntityEdit from "../EntityEdit";

export default class PageModel {
    public name: string;
    public displayName: string;
    public description: string;
    public pageType: string;
    public creator: EntityEdit;
    public lastUpdater: EntityEdit;
    public discriminator: string;
}