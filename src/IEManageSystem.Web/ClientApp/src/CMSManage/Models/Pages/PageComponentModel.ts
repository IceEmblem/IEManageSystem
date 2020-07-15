import PageComponentBaseSettingModel from "./PageComponentBaseSettingModel";
import PageComponentSettingModel from "./PageComponentSettingModel";
import PageLeafSettingModel from "./PageLeafSettingModel";
import PageComponentCollection from "./PageComponentCollection";

export default class PageComponentModel {
    public id: number;
    public name: string;
    public sign: string;
    public parentSign: string | null;
    public menuName: string | null;
    public componentType: string;
    public pageComponentBaseSetting: PageComponentBaseSettingModel;
    public pageLeafSetting: PageLeafSettingModel;
    public pageComponentSettings: Array<PageComponentSettingModel>;

    public get pageComponents(): Array<PageComponentModel> {
        return this._pageComponentCollection.pageComponents;
    }

    private _pageComponentCollection: PageComponentCollection = new PageComponentCollection([]);

    private _snapshotData: any;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.sign = data.sign;
        this.parentSign = data.parentSign;
        this.menuName = data.menuName;
        this.componentType = data.componentType;

        this.pageComponentBaseSetting = new PageComponentBaseSettingModel(data.pageComponentBaseSetting);
        this.pageLeafSetting = new PageLeafSettingModel(data.pageLeafSetting);

        this.pageComponentSettings = [];
        data.pageComponentSettings.forEach((element: any) => {
            this.pageComponentSettings.push(new PageComponentSettingModel(element));
        });
    }

    // 快照
    snapshot() {
        this._snapshotData = Object.assign({}, this);
        this._snapshotData.pageComponentBaseSetting = Object.assign({}, this.pageComponentBaseSetting);
        this._snapshotData.pageLeafSetting = Object.assign({}, this.pageLeafSetting);

        this._snapshotData.pageComponentSettings = Object.assign([], this.pageComponentSettings);
    }

    // 清理快照
    clearSnapshot() {
        this._snapshotData = undefined;
    }

    // 通过快照恢复数据
    resumeForsnapshot() {
        if (!this._snapshotData) {
            return;
        }

        this.pageComponentBaseSetting = Object.assign(this.pageComponentBaseSetting, this._snapshotData.pageComponentBaseSetting);
        this.pageLeafSetting = Object.assign(this.pageLeafSetting, this._snapshotData.pageLeafSetting);
        this.pageComponentSettings = Object.assign(this.pageComponentSettings, this._snapshotData.pageComponentSettings);
        this.id = this._snapshotData.id;
        this.name = this._snapshotData.name;
        this.sign = this._snapshotData.sign;
        this.parentSign = this._snapshotData.parentSign;
        this.menuName = this._snapshotData.menuName;
        this.componentType = this._snapshotData.componentType;
    }

    setChilds(childs: Array<PageComponentModel>) {
        this._pageComponentCollection = new PageComponentCollection(childs);
    }

    addPageComponent(pageComponentData: PageComponentModel): void {
        this._pageComponentCollection.addPageComponent(pageComponentData);
    }

    removePageComponent(pageComponentData: PageComponentModel): void {
        this._pageComponentCollection.removePageComponent(pageComponentData);
    }

    // 获取树下所有节点
    getAllChilds(): Array<PageComponentModel> {
        let childs = [...this.pageComponents];
        this.pageComponents.forEach(item => {
            childs = [...childs, ...item.getAllChilds()]
        })

        return childs;
    }

    childComponentsSort() {
        this._pageComponentCollection.pageComponentSort();
    }

    public toJsonObject() {
        return {
            id: this.id,
            name: this.name,
            sign: this.sign,
            parentSign: this.parentSign,
            menuName: this.menuName,
            componentType: this.componentType,
            pageComponentBaseSetting: this.pageComponentBaseSetting,
            pageLeafSetting: this.pageLeafSetting,
            pageComponentSettings: this.pageComponentSettings
        }
    }
}