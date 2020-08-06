import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    static readonly lineSettingName: string = "line";
    static readonly zhuzhuangSettingName: string = "zhuzhuang";
    static readonly tiaoxingSettingName: string = "tiaoxing";

    setting: PageComponentSettingModel;

    constructor(pageComponentSetting: PageComponentSettingModel) {
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting: PageComponentSettingModel) {
        this.setting = pageComponentSetting;
    }

    get lines() {
        return this.setting.getDefauleData().field1;
    }

    set lines(val) {
        this.setting.getDefauleData().field1 = val;
    }

    getLines(): Array<string> {
        return this.setting.getDefauleData().field1 ?
            this.setting.getDefauleData().field1.split("|")
            : []
    }

    get suffix() {
        return this.setting.getDefauleData().field2 || "";
    }

    set suffix(val) {
        this.setting.getDefauleData().field2 = val;
    }

    get type() {
        return this.setting.getDefauleData().field3 || "zz";
    }

    set type(val) {
        this.setting.getDefauleData().field3 = val;
    }

    // 是否是折线
    get iszx() {
        return this.type == "zx";
    }

    // 是否是柱状
    get iszz() {
        return this.type == "zz";
    }

    // 是否是条形
    get istx() {
        return this.type == "tx";
    }


    /// 折线图配置
    get lineShape() {
        return this.setting.getOrCreateSingleDate(Setting.lineSettingName).field1 || "";
    }

    set lineShape(val) {
        this.setting.getOrCreateSingleDate(Setting.lineSettingName).field1 = val;
    }



    /// 柱状图配置
    get zhuzhuangShape() {
        return this.setting.getOrCreateSingleDate(Setting.zhuzhuangSettingName).field1 || "";
    }

    set zhuzhuangShape(val) {
        this.setting.getOrCreateSingleDate(Setting.zhuzhuangSettingName).field1 = val;
    }

    // 是否为条形
    get isTiaoxingOfzhuzhuang() {
        return this.zhuzhuangShape == "tiaoxing";
    }

    // 是否为圆形
    get isYuanxingOfzhuzhuang() {
        return this.zhuzhuangShape == "yuanxing";
    }

    // 显示类型
    get dodgeOfzhuzhuang() {
        return this.setting.getOrCreateSingleDate(Setting.zhuzhuangSettingName).field2 || "dodge";
    }

    set dodgeOfzhuzhuang(val) {
        this.setting.getOrCreateSingleDate(Setting.zhuzhuangSettingName).field2 = val;
    }



    /// 条形图配置
    
    // 显示类型
    get dodgeOfTiaoxing() {
        return this.setting.getOrCreateSingleDate(Setting.tiaoxingSettingName).field2 || "dodge";
    }

    set dodgeOfTiaoxing(val) {
        this.setting.getOrCreateSingleDate(Setting.tiaoxingSettingName).field2 = val;
    }
}